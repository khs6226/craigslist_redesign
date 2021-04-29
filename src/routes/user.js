const express = require('express');
const router = express.Router();
const { auth, requiresAuth } = require('express-openid-connect');

router.get('/profile', requiresAuth(), function (req, res) {
    let authenticated = req.oidc.isAuthenticated();
    let user = req.oidc.user;
    if (authenticated) {
      res.render('profile', { user: user });
    } else {
      res.redirect('/');
    }
  })

router.get('/posting', requiresAuth(), (req, res) => {
  let authenticated = req.oidc.isAuthenticated();
  let user = req.oidc.user;
  if (authenticated) {
    res.render('posting', { user: user });
  } else {
    res.redirect('/');
  }
})

module.exports = router 