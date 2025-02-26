# Program to send coordinates to sms-alert program to test functionality

import requests
import json
from credentials import url
from credentials import my_phone

data = {
    "route": "https://www.google.com/maps/dir/starting_latitude,starting_longitude/stop_1_latitude,stop_1_longitude/stop_2_latitude,stop_2_longitude/destination_latitude,destination_longitude/",
    "phone": my_phone
    } 

# Send new data via POST request
response = requests.post(url, json=data)

# Check response from server
if response.status_code == 200:
    print(f"\nServer Response: {response.json()}")
else:
    print(f"Failed to send message. Status code: {response.status_code}")
    