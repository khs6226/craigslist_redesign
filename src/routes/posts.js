const express = require('express');
const router = express.Router();
const dbConnection = require('../dbConnection');
const { auth, requiresAuth } = require('express-openid-connect');

// get / path

router.