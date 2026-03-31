from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()

client = MongoClient(os.getenv("MONGO_URI"))

db = client["biowaste_db"]

waste_collection = db["waste_logs"]
report_collection = db["reports"]
user_collection = db["users"]

def test_connection():
    try:
        client.admin.command('ping')
        print("MongoDB connected successfully!")
        return True
    except Exception as e:
        print(f"MongoDB connection failed: {e}")
        return False