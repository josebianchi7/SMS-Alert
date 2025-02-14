# Program to send coordinates to sms-alert program to test functionality

import requests
import json

# Store URL of resource (server)
# url = 'https://web.engr.oregonstate.edu/~bianchjo' 
url = 'https://economic-rainy-numeric.glitch.me/sms-alert'

data = {
    "coordinates": [{"latitude": 34.0529, "longitude": -118.2437},
        {"latitude": 36.1681, "longitude": -115.1398}],
    "phone": "5127736797"
    } 

# Send new data via POST request
response = requests.post(url, json=data)

# Check response from server
if response.status_code == 200:
    print(f"\nServer Response: {response.json()}")
else:
    print(f"Failed to send message. Status code: {response.status_code}")
    