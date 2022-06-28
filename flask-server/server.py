
import threading
from flask import Flask
from fncts.bdConfig import *
import psycopg2
import time

from fncts.serviceFunc import get_service_sacc, createTable, getSheet 
connection=""
x=True

app=Flask(__name__)

def startMain():
    try:
        #Подключение к таблице
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
        getSheet(sheet, connection)
        return 
    except:
        return {"about":"Error when working with the table"}
    finally:
        if connection:
            connection.close()
            return{"about":"PostgreSQL connection closed"}

thr1=threading.Thread(target=startMain)

@app.route("/startscript")
def startScript():
    stop_threads=0
    thr1.start()
    return {"about":"Running"}

@app.route("/stopscript")
def stopScript():
    setStop()
    return {"about":"Stopped"}

@app.route("/config")
def setts():
    return {"configures":[host,user, db_name,table_name,gSheet_id,delayUpdate]}



if __name__=="__main__":
    app.run(debug=True)