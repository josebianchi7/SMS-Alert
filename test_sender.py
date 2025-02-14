# Program to send coordinates to sms-alert program to test functionality

import requests
import json

# Store URL of resource (server)
# url = 'https://web.engr.oregonstate.edu/~bianchjo' 
url = 'https://economic-rainy-numeric.glitch.me/sms-alert'

data = {
    "coordinates": [{"latitude": 30.364124, "longitude": -97.227034},
        {"latitude": 31.364124, "longitude": -97.227036}],
    "phone": "5127736797"
    } 

# Send new data via POST request
response = requests.post(url, json=data)

# Check response from server
if response.status_code == 200:
    print(f"\nServer Response: {response.json()}")
else:
    print(f"Failed to send message. Status code: {response.status_code}")
    