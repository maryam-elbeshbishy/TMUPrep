from pymongo import MongoClient, InsertOne
import json

CONNECTION_STRING = "mongodb+srv://drice:0i2psWT09d3ZtNMq@projects.hx2wxbo.mongodb.net/tmuprep?authSource=admin&replicaSet=atlas-j2yill-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true"
DATABASE = "tmuprep"
collection = "course"

client = MongoClient(CONNECTION_STRING)
db = client.DATABASE
collection = db.course
requesting = []

with open(r"courseData.json") as f:
    json_data = json.load(f)
    for jsonObj in json_data:
        myDict = json.loads(json.dumps(jsonObj))
        requesting.append(InsertOne(myDict))

try:
    result = collection.bulk_write(requesting)
    print(result)
except Exception as e:
    print("An error occurred:", str(e))

client.close()