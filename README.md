
# SMS Alert Microservice

This program listens for coordinate and phone data, generates a Google Maps link, and send link as an SMS message to the phone number provided. 


## Authors

- [@josebianchi7](https://github.com/josebianchi7/Portfolio)


## Deployment

To deploy this project, the following is required:

Hosting Service for either web socket or web app. Recommend Glitch with a Hello Node (blank) template. 

Need node version 15 or higher. If using Glitch, must use version 16. Update node version in package.json:

```
"node": "16.x"
```

Necessary Dependencies:

```
"dependencies": {
    "@vonage/server-sdk": "^3.19.4",
    "body-parser": "^2.1.0",
    "express": "^4.21.2",
    "handlebars": "^4.7.8",
    "nexmo": "^2.9.1",
    "nexmo-client": "^9.6.1",
    "ws": "^8.18.0"
  }
```

## API Reference

#### SMS Service (Vonage)

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `apiKey` | `string` | **Required**. Your API Key |
| `apiSecret` | `string` | **Required**. Your API Secret |
| `from` | `string` | **Required**. Your Vonage From number |

#### Run in bash terminal after creating node project
```bash
npm install @vonage/server-sdk
```

Following remaining steps for implementation on your Voyage dashboard at the "Try the SMS API" page.

On Glitch, web socket/ app are continuosly running, so no  further action after server.js file is complete.

