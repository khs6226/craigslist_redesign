const { auth, requiresAuth } = require('express-openid-connect');
require('dotenv').config();
const express = require('express');
const app = express();
const user = require('./routes/user')
const port = 8080;


// Auth0 config
const config = {
  authRequired: false,
  auth0Logout: true,
  baseURL: 'http://localhost:8080',
  clientID: process.env.AUTH_CLIENT_ID,
  issuerBaseURL: process.env.AUTH_DOMAIN,
  secret: process.env.AUTH_CLIENT_SECRET
};


// Middleware
app.use(auth(config));
app.use(express.json());

// Views engine
app.set('view engine', 'ejs');


// Routes
app.use('/user', user);


app.get('/', function (req, res) {
  let authenticated = req.oidc.isAuthenticated();
  let username;
  if (authenticated) {
    username = JSON.stringify(req.oidc.user)
  }
  res.render('index', { user: username })
})

// app.get('/profile', requiresAuth(), function (req, res) {
//   let authenticated = req.oidc.isAuthenticated();
//   let user;
//   if (authenticated) {
//     user = JSON.stringify(req.oidc.user)
//   }
//   res.render('profile', { user: user });
// })


app.listen(port, () => {
    console.log('Listening on port 8080...')
})