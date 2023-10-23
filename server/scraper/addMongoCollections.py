from pymongo import MongoClient, InsertOne
import json
import os
from dotenv import load_dotenv

load_dotenv('../.env')
CONNECTION_STRING = os.getenv("MONGOURI")

client = MongoClient(CONNECTION_STRING)
db = client.tmuprep
courses_collection = db.courses
antirequisites_collection = db.antirequisites
prerequisites_collection = db.prerequisites
requesting_courses = []

with open(r"courseData.json") as f:
    json_data = json.load(f)
    for jsonObj in json_data:
        # Remove the "antirequisites" and "prerequisites" fields from the course document
        course_document = jsonObj.copy()
        course_document.pop("antirequisites", None)
        course_document.pop("prerequisites", None)
        requesting_courses.append(InsertOne(course_document))

        # Create a separate antirequisite document for each antirequisite
        if "antirequisites" in jsonObj:
            for antirequisite in jsonObj["antirequisites"]:
                antirequisite_document = {
                    "courseCode": jsonObj["courseCode"],
                    "antirequisite": antirequisite
                }
                antirequisites_collection.insert_one(antirequisite_document)

        # Create a separate prerequisites document for each prerequisite
        if "prerequisites" in jsonObj:
            for prerequisite in jsonObj["prerequisites"]:
                prerequisite_document = {
                    "courseCode": jsonObj["courseCode"],
                    "prerequisite": prerequisite
                }
                prerequisites_collection.insert_one(prerequisite_document)

try:
    result_course = courses_collection.bulk_write(requesting_courses)
    print("Courses Collection Result:", result_course)
except Exception as e:
    print("An error occurred:", str(e))

client.close()
