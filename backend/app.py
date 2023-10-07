from flask import Flask, jsonify
from flask_pymongo import PyMongo
import random
from datetime import datetime, timedelta
from datetime import datetime
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Connect to the local MongoDB instance
app.config["MONGO_URI"] = "mongodb://localhost:27017/energydb"
mongo = PyMongo(app)

@app.route('/generate_data', methods=['GET'])
def generate_data():
    energy = random.uniform(10.5, 50.5)  # Example range for energy consumption
    status = random.choice(['active', 'idle', 'offline'])

    # Create a new data point
    data_point = {
        "timestamp": datetime.utcnow(),
        "energyConsumption": energy,
        "deviceStatus": status
    }

    # Insert into MongoDB
    mongo.db.datapoints.insert_one(data_point)

    return jsonify({"message": "Data generated successfully!"}), 201

@app.route('/retrieve_data', methods=['GET'])
def retrieve_data():
    twenty_four_hours_ago = datetime.utcnow() - timedelta(days=1)
    
    # Querying MongoDB for the last 24 hours of data
    data = list(mongo.db.datapoints.find({"timestamp": {"$gte": twenty_four_hours_ago}}))

    # Convert MongoDB objects to JSON serializable format
    for item in data:
        item["_id"] = str(item["_id"])
        item["timestamp"] = item["timestamp"].strftime('%Y-%m-%d %H:%M:%S')

    return jsonify(data)    
if __name__ == "__main__":
    app.run(debug=True)    