const express = require('express');
const router = express.Router();
const dbConnection = require('../dbConnection');
const postModel = require('../models/postModel');
const { getFileStream } = require('../models/S3');

const { auth, requiresAuth } = require('express-openid-connect');
const { categorySearch } = require('../models/searchModel');

router.get('/contact', (req, res) => {
    let user = req.oidc.user;
    res.render('contact-us', { user: user })
})

router.get('/privacy', (req, res) => {
  let user = req.oidc.user;
  res.render('privacy', { user: user })
})

router.get('/faq', (req, res) => {
  let user = req.oidc.user;
  res.render('faq', { user: user })
})

router.get('/terms', (req, res) => {
  let user = req.oidc.user;
  res.render('terms', { user: user })
})

module.exports = router;