const express = require('express');
const router = express.Router();
const dbConnection = require('../dbConnection');
const { auth, requiresAuth } = require('express-openid-connect');
const postModel = require('../models/postModel');
const { post } = require('./user');


router.get('/new-post', (req, res) => {
    let authenticated = req.oidc.isAuthenticated();
    let user = req.oidc.user;
    res.render('new-post', { user: user });
})

router.get('/:id', (req, res) => {
    let authenticated = req.oidc.isAuthenticated();
    let user = req.oidc.user;

    let postId = req.params.id;
 
    postModel.getPostById(postId, (err, results) => {
        if (err) {
            console.log(err);
        } else {
            if (authenticated) {
                console.log(results[0])
                res.render('post', { user: user, postData: results[0] })
            } else {
                res.render('post', { user: false, postData: results[0] })
            }
        }
    });
})

router.post('/post-preview', (req, res) => {
    let authenticated = req.oidc.isAuthenticated();
    let user = req.oidc.user;

    let postData = req.body;
    // have controller layer in between to return new object with proper location data
    postModel.addPost(postData, (err) => {
        if (err) {
            console.log(err);
        }
        console.log('New post added to db ' + postData);
    });
    console.log(postData);

    res.render('post-preview', { user: user })
});

module.exports = router;