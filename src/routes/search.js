const express = require('express');
const router = express.Router();
const dbConnection = require('../dbConnection');
const { searchModel } = require('../models/searchModel');
const { auth, requiresAuth } = require('express-openid-connect');
const { check, validationResult  } = require('express-validator');

router.get('/results', (req, res) => {
    let authenticated = req.oidc.isAuthenticated();
    let user = req.oidc.user;

    const minPrice = req.query['min-price'];
    const maxPrice = req.query['max-price'];
    const category = req.query.category;
    const condition = req.query.condition;
    const location = req.query.location

    let searchParams = req.query.query;
    searchModel(searchParams, (err, results) => {
        if (err) {
            console.log(err);
            return err;
        } else {
            if (authenticated) {
                res.render('results', { user: user, posts: results, query: searchParams, filter: { minPrice: minPrice, maxPrice: maxPrice, category: category, condition: condition, location: location }});
            } else {
                res.render('results', { user: false, posts: results, query: searchParams, filter: { minPrice: minPrice, maxPrice: maxPrice, category: category, condition: condition, location: location }});
            }
        }
    });
})

module.exports = router;