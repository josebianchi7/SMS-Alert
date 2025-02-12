# Author: Jose Bianchi
# Description:  Microservice that accepts a JSON object with keys “coordinates” and “phone”. 
#   Coordinates key contains list value with one or more dictionary object containing keys 
#   “latitude” and “longitude” with corresponding string values. Phone key should contain 
#   only one phone number string value. Microservice converts each coordinate into a Google 
#   Maps link and sends the string links via SMS through an API service to the phone value.

from flask import Flask, request, jsonify

def listen_for_message():
    """
    Listener function that will store messages posted at the designated URL.
    """




def main():
    """
    Function to control flow of function calls and run complete microservicee.
    """

if __name__ == "__main__":
    main()
