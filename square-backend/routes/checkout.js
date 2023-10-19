]// FILEPATH: app.js

const express = require('express');
const app = express();
const port = 3000;

const SquareConnect = require('square-connect');
const defaultClient = SquareConnect.ApiClient.instance;

// Configure OAuth2 access token for authorization: oauth2
const oauth2 = defaultClient.authentications['oauth2'];
oauth2.accessToken = 'YOUR_ACCESS_TOKEN';

const apiInstance = new SquareConnect.CheckoutApi();

app.get('/getPrice', (req, res) => {
  const requestParams = {
    locationId: 'YOUR_LOCATION_ID',
    idempotencyKey: 'YOUR_IDEMPOTENCY_KEY',
    order: {
      lineItems: [
        {
          name: 'Test Item',
          quantity: '1',
          basePriceMoney: {
            amount: 100,
            currency: 'USD'
          }
        }
      ]
    }
  };

  apiInstance.createCheckout(requestParams).then((data) => {
    res.redirect(data.checkout.checkoutPageUrl);
  }).catch((error) => {
    console.error(error);
    res.send('Error creating checkout');
  });
});