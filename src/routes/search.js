const express = require('express');
const router = express.Router();
const dbConnection = require('../dbConnection');
const searchQuery = require('../models/searchQuery');
const { auth, requiresAuth } = require('express-openid-connect');

router.post('/results', (req, res) => {
    let authenticated = req.oidc.isAuthenticated();
    let user = req.oidc.user;
    let query = req.body.query;


    if (authenticated) {
      res.render('profile', { user: user });
    } else {
        res.render('profile', { user: false });
    }
})


module.exports = router;