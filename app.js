const { auth } = require('express-openid-connect');
require('dotenv').config();
const express = require('express');
const app = express();
const port = 8080;


// Auth0 config
const config = {
  authRequired: false,
  auth0Logout: true,
  baseURL: 'https://localhost:8080',
  clientID: process.env.AUTH_CLIENT_ID,
  issuerBaseURL: process.env.AUTH_DOMAIN,
  secret: process.env.AUTH_CLIENT_SECRET
};


// Middleware
app.use(auth(config));
app.use(express.json());

// Views engine
app.set('view engine', 'ejs');


app.get('/', function (req, res) {
  res.render(req.oidc.isAuthenticated() ? 'index' : 'authError')
})


app.listen(port, () => {
    console.log('Listening on port 8080...')
})