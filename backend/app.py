from flask import Flask, jsonify
from flask_pymongo import PyMongo
import random
from collections import Counter
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
    twenty_four_hours_ago = datetime.utcnow() - timedelta(days=1)
    mongo.db.datapoints.delete_many({"timestamp": {"$lt": twenty_four_hours_ago}})

    return jsonify({"message": "Data generated successfully!"}), 201

@app.route('/retrieve_data', methods=['GET'])
def retrieve_data():
    twenty_four_hours_ago = datetime.utcnow() - timedelta(days=1)
    
    #last 24 hours data
    data = list(mongo.db.datapoints.find({"timestamp": {"$gte": twenty_four_hours_ago}}))
    
    #parse data 
    for item in data:
        item["_id"] = str(item["_id"])
        item["timestamp"] = item["timestamp"].strftime('%Y-%m-%d %H:%M:%S')

    return jsonify(data)    

@app.route('/summary', methods=['GET'])
def summary():
    twenty_four_hours_ago = datetime.utcnow() - timedelta(days=1)
    
    
    data = list(mongo.db.datapoints.find({"timestamp": {"$gte": twenty_four_hours_ago}}))

    
    if not data:
        return jsonify({"message": "No data available for the last 24 hours."}), 404

   
    total_energy = sum(item['energyConsumption'] for item in data)
    average_energy = total_energy / len(data)
    
    
    max_energy_data_point = max(data, key=lambda x: x['energyConsumption'])
    max_energy_timestamp = max_energy_data_point['timestamp'].strftime('%Y-%m-%d %H:%M:%S')
    
 
    status_counts = Counter(item['deviceStatus'] for item in data)
    most_frequent_status = status_counts.most_common(1)[0][0]

 
    metrics = {
        "averageEnergyConsumption": average_energy,
        "highestEnergyTimestamp": max_energy_timestamp,
        "totalEnergyConsumed": total_energy,
        "mostFrequentStatus": most_frequent_status
    }

    return jsonify(metrics)    
if __name__ == "__main__":
    app.run(debug=True)    