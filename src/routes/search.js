const express = require('express');
const router = express.Router();
const dbConnection = require('../dbConnection');
const { searchModel } = require('../models/searchModel');
const { auth, requiresAuth } = require('express-openid-connect');

router.get('/results', (req, res) => {
    let authenticated = req.oidc.isAuthenticated();
    let user = req.oidc.user;

    let searchParams = req.query.query;
    searchModel(searchParams, (err, results) => {
        if (err) {
            console.log(err);
            return err;
        } else {
            console.log(results);
            if (authenticated) {
                res.render('results', { user: user, posts: results });
            } else {
                res.render('results', { user: false, posts: results });
            }
        }
    });
})


module.exports = router;