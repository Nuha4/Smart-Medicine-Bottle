import json, ast
from flask import Flask
from flask import request
from pymongo import MongoClient  # Database connector
from bson.objectid import ObjectId  # For ObjectId to work

# client = MongoClient('localhost', 27017)    #Configure the connection to the database
# db = client.sensor   #Select the database
# todos = db.sensor_data #Select the collection

app = Flask(__name__)
from pymongo import MongoClient

#Connect to MongoDB
client = MongoClient(port=27017)
db = client.MedicineDB

@app.route('/')
def hello():
    print("it works")
    return "It Works"

@app.route('/value', methods=['POST'])
def value():
    #content = request.data
    #print(content)
    print(request.is_json)
    content = request.get_json()
    test = ast.literal_eval(json.dumps(content))
    print(request.get_json())

    # timestamp=test["timestamp"]
    # name=test["name"]
    # value=test["value"]
    # id=test["id"]
    # todos.insert({ "timestamp":timestamp, "name":name, "value":value, "id":id})
    file=open('test.txt','a')
    file.write("data"+str(test))
    print("File Read Successed")
    file.close()
    return "json posted"

    result=db.data_table.insert_one(test)
    return "added"

app.run(host='192.168.7.40', port=8081)