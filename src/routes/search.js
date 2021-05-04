const express = require('express');
const router = express.Router();
const dbConnection = require('../dbConnection');
const searchQuery = require('../models/searchQuery');
const { auth, requiresAuth } = require('express-openid-connect');

router.post('/results', (req, res) => {
    let authenticated = req.oidc.isAuthenticated();
    let user = req.oidc.user;
    let query = req.body.query;
    searchQuery(query, (err, results) => {
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