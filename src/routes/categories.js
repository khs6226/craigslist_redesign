const express = require('express');
const router = express.Router();
const dbConnection = require('../dbConnection');
const postModel = require('../models/postModel');
const { auth, requiresAuth } = require('express-openid-connect');
const { categorySearch } = require('../models/searchModel');

router.get('/', (req, res) => {
    let user = req.oidc.user;
    res.render('explore', { user: user })
})

router.get('/:category', (req, res) => {
    let user = req.oidc.user;
    
    let category = req.params.category;
    postModel.getPostByCategory(category, (err, results) => {
        if (err) {
            console.log(err); 
            return;
        }
        console.log(results);
        res.render('category', { user: user, category: category, posts: results })
    });
})

router.get('/:category/')

module.exports = router;