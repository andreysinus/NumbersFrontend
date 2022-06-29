from re import X
import threading
from flask import Flask
from fncts.bdConfig import *
import psycopg2
import time

from fncts.serviceFunc import get_service_sacc, createTable, getSheet 
connection=""
x=True
runned=False
app=Flask(__name__)

def startMain():
    try:
        global runned
        global x
        if runned==False:
            #Подключение к таблице
            runned=True
            service = get_service_sacc()
            sheet = service.spreadsheets()
            #Подключение к БД
            connection=psycopg2.connect(
                    user=user,
                    host=host,
                    password=password,
                    database=db_name
                )
            #Создание таблицы, при её отсутсвии
            createTable(connection)
            #Внесение изменений в БД
            while x==True:
                getSheet(sheet, connection)
                #Задержка между выполнением
                time.sleep(delayUpdate)
            runned=False
            print ("Stopped")
            return {"about":"Stopped"}
        else:
            return {"about": "Already running"}
    except:
        return {"about":"Error when working with the table"}
    finally:
        if connection:
            connection.close()
            return{"about":"PostgreSQL connection closed"}


@app.route("/startscript")
def startScript():
    global x
    x=True
    startMain()
    return {"about":"Stopped"}

@app.route("/stopscript")
def stopScript():
    global x
    x=False
    return {"about":"Stopped"}

@app.route("/config")
def setts():
    return {"configures":[host,user, db_name,table_name,gSheet_id,delayUpdate,]}

@app.route("/param")
def param():
    if runned==True:
        run=1
    else:
        run=0
    return{"params":[run]}

if __name__=="__main__":
    app.run(debug=True)