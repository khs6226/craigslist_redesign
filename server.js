const { auth, requiresAuth } = require('express-openid-connect');
require('dotenv').config();
const path = require('path');
const express = require('express');
const app = express();
const user = require('./src/routes/user');
const search = require('./src/routes/search');
const posts = require('./src/routes/posts');
const categories = require('./src/routes/categories');
const other = require('./src/routes/other');
const port = process.env.PORT || 8080;


// Auth0 config
let config
if (process.env.IS_HEROKU) {
  config = {
    authRequired: false,
    auth0Logout: true,
    baseURL: 'https://idsp2380-craigslist.herokuapp.com/',
    clientID: process.env.AUTH_CLIENT_ID,
    issuerBaseURL: process.env.AUTH_DOMAIN,
    secret: process.env.AUTH_CLIENT_SECRET
  };
} else {
  config = {
    authRequired: false,
    auth0Logout: true,
    baseURL: 'http://localhost:8080',
    clientID: process.env.AUTH_CLIENT_ID,
    issuerBaseURL: process.env.AUTH_DOMAIN,
    secret: process.env.AUTH_CLIENT_SECRET
  };
}

// Middleware
app.use(auth(config));
app.use(express.json());
app.use(express.static(__dirname + '/src/public'));
app.use(express.urlencoded());


// Views engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './src/views'));


// Routes
app.use('/user', user);
app.use('/search', search);
app.use('/posts', posts);
app.use('/categories', categories);
app.use('/other', other);


app.get('/', function (req, res) {
  let authenticated = req.oidc.isAuthenticated();
  let username;
  if (authenticated) {
    username = req.oidc.user.nickname
  }
  res.render('index', { user: username })
})

app.listen(port, () => {
    console.log('Listening on port 8080...')
})