const express = require('express');
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

// Use express to process JSON requests
app.use(express.json());

// Handle POST requests with JSON data, store expected data via key names
app.post('/sms-alert', (req, res) => {
  const { route, phone } = req.body;

  // Data confirmation
  if (!route || !phone) {
    return res.status(400).json({ error: 'Data missing required fields.' });
  }
  res.status(200).json({ message: 'Data successfully received.' });
  
  let rec_phone = phone.split('-').join('');
  let text = `This message is for ${rec_phone}.\n\n`;
  text = text + route + "\n\n";

  // Send Message via Vonage API
  async function sendSMS() {
      await vonage.sms.send({to, from, text})
          .then(resp => { console.log('Message sent successfully'); console.log(resp); })
          .catch(err => { console.log('There was an error sending the messages.'); console.error(err); });
  }
  sendSMS();
});

app.server = app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});