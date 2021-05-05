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

router.post('/post-preview', (req, res) => {
    let authenticated = req.oidc.isAuthenticated();
    let user = req.oidc.user;

    let postData = req.body;
    console.log(postData);

    res.render('post-preview', { user: user })
});

module.exports = router;