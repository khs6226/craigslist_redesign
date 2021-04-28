const express = require('express');
const router = express.Router();
const { auth, requiresAuth } = require('express-openid-connect');

router.get('/profile', requiresAuth(), function (req, res) {
    let authenticated = req.oidc.isAuthenticated();
    let user;
    if (authenticated) {
      user = JSON.stringify(req.oidc.user)
    }
    res.render('profile', { user: user });
  })

module.exports = router 