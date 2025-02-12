# Program to send coordinates to sms-alert program to test functionality

import requests
import json

# Store URL of resource (server)
url = 'http://127.0.0.1:5000/send-json' 

data = {
    "coordinates": [{"latitude": 34.0522, "longitude": -118.2437},
        {"latitude": 36.1699, "longitude": -115.1398},
        {"latitude": 40.7128, "longitude": -74.0060},{"latitude": 37.7749, "longitude": -122.4194}],
    "phone": "5127736797"
    } 

# Send new data via POST request
response = requests.post(url, json=data)

# Check response from server
if response.status_code == 200:
    print(f"\nServer Response: {response.json()}")
else:
    print(f"Failed to send message. Status code: {response.status_code}")