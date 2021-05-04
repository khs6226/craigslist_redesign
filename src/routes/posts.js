const express = require('express');
const router = express.Router();
const dbConnection = require('../dbConnection');
const { auth, requiresAuth } = require('express-openid-connect');

// get / path

router.get('/new-post', (req, res) => {
    let authenticated = req.oidc.isAuthenticated();
    let user = req.oidc.user;
    res.render('new-post', { user: user });
})

router.post('post-created', (req, res) => {
    
});

module.exports = router;