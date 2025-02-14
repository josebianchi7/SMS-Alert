/*
Name: Jose Bianchi
Description: Program acts as a web socket to listen for data and send SMS message with data converted into 
  Google Maps link.
*/

const express = require('express');
const WebSocket = require('ws');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 5000;

// Initialize SMS API using Vonage
const { Vonage } = require('@vonage/server-sdk')
const vonage = new Vonage({
  apiKey: process.env.VonageAPIKey,
  apiSecret: process.env.VonageAPISecret
})
const from = process.env.VonagePhone


// Middleware to parse incoming JSON requests
app.use(express.json());

// Set up WebSocket server
const wss = new WebSocket.Server({ noServer: true });

// WebSocket connection handler
wss.on('connection', (ws) => {
  console.log('New WebSocket connection established');

  ws.on('message', (message) => {
    console.log('Received WebSocket message:', message);
  });
});


// Handle POST requests with JSON data
app.post('/sms-alert', (req, res) => {
  const { coordinates, phone } = req.body;

  if (!coordinates || !phone) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  
  // Store the data in a local JSON file
  const data = { coordinates, phone };
  coordinates.forEach(curr_coordinate => {
    let curr_lat = curr_coordinate.latitude;
    let curr_long = curr_coordinate.longitude;
    let googleMapsLink = `https://maps.google.com/?q=${curr_lat},${curr_long}\n\n`;

    // Send SMS message
    const to = "1" + phone
    const text = googleMapsLink

    async function sendSMS() {
        await vonage.sms.send({to, from, text})
            .then(resp => { console.log('Message sent successfully'); console.log(resp); })
            .catch(err => { console.log('There was an error sending the messages.'); console.error(err); });
    }
    
    // Call SMS send function
    sendSMS();
    });

  // Save data to local file
  fs.appendFile('data.json', JSON.stringify(data) + '\n', (err) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to store data' });
    }
    console.log('Data saved:', data);

    // Respond with success
    res.status(200).json({ message: 'Data successfully received.' });
  });
});

// Handle WebSocket upgrade requests
app.server = app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

app.server.on('upgrade', (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit('connection', ws, request);
  });
});