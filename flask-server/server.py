from concurrent.futures.process import _global_shutdown
from flask import Flask
from fncts.bdConfig import *


app=Flask(__name__)

@app.route("/members")
def members():
    return {"members": ["Member1", "Member2"]}

@app.route("/config")
def setts():
    return {"configures":[host,user, db_name,table_name,gSheet_id,delayUpdate]}



if __name__=="__main__":
    app.run(debug=True)