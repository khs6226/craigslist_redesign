const express = require('express');
const router = express.Router();
const dbConnection = require('../dbConnection');
const postModel = require('../models/postModel');
const { getFileStream } = require('../models/S3');

const { auth, requiresAuth } = require('express-openid-connect');
const { categorySearch } = require('../models/searchModel');

router.get('/', (req, res) => {
    let user = req.oidc.user;
    res.render('contact-us', { user: user })
})

module.exports = router;