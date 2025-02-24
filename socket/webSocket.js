const express = require('express');
const WebSocket = require('ws');
const app = express();
const port = process.env.PORT || 5000;

// Initialize SMS API using Vonage
const { Vonage } = require('@vonage/server-sdk');
const vonage = new Vonage({
  apiKey: process.env.VonageAPIKey,
  apiSecret: process.env.VonageAPISecret
});
const from = process.env.VonagePhone;
const to = process.env.RegPhone;


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

// Handle POST requests with JSON data, store expected data via key names
app.post('/sms-alert', (req, res) => {
  const { route, phone } = req.body;

  // Send HTTP response based on data received
  if (!route || !phone) {
    return res.status(400).json({ error: 'Data missing required fields.' });
  }
  res.status(200).json({ message: 'Data successfully received.' });
  
  // Prepare SMS text
  let rec_phone = phone.split('-').join('');
  let text = `This message is for ${rec_phone}.\n\n`;
  text = text + route + "\n\n";

  // Send SMS Message with route link using code from SMS API
  async function sendSMS() {
      await vonage.sms.send({to, from, text})
          .then(resp => { console.log('Message sent successfully'); console.log(resp); })
          .catch(err => { console.log('There was an error sending the messages.'); console.error(err); });
  }
  // Call SMS send function
  sendSMS();
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