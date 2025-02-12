# Name: Jose Bianchi 
# Description: program acts a server to receive data communications
#    via HTTP methods and confirms received with console messages.

from flask import Flask, request, jsonify
import os

app = Flask(__name__)

# @app.route('/')
# def root():
#     return "<h1>Coordinates and Phone Number Receiver</h1>"


# Route to handle POST requests
@app.route('/send-json', methods=['POST'])
def receive_json():
    # Check if the incoming request contains JSON
    if request.is_json:
        # Get the JSON data from the request
        data = request.get_json()

        # Print the received data (for debugging)
        print("Received JSON data:", data)

        # Respond with a confirmation message
        return jsonify({"message": "JSON data received successfully!", "received": data}), 200
    else:
        # If the request is not JSON, return an error
        return jsonify({"error": "Request must be JSON"}), 400



# Listener
if __name__ == "__main__":
    port = int(os.environ.get('PORT', 5000)) 
    #Start the app on port
    app.run(port=port, debug=True)