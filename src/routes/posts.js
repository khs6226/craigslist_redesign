const express = require('express');
const router = express.Router();
const dbConnection = require('../dbConnection');
const { auth, requiresAuth } = require('express-openid-connect');
const postModel = require('../models/postModel');
const { post } = require('./user');
const fs = require('fs');
const multer = require('multer');
const upload = multer({ dest: 'uploads/'});
const util = require('util')
const unlinkFile = util.promisify(fs.unlink)

const { uploadFile, getFileStream } = require('../models/S3');
const { create } = require('domain');


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

router.get('/:id/edit', (req, res) => {
    // edit post info
})

router.get('/:id/delete', (req, res) => {
    let authenticated = req.oidc.isAuthenticated();
    let user = req.oidc.user;

    let postId = req.params.id;

    postModel.deletePost(postId, (err) => {
        if (err) {
            console.log(err);
            return;
        }
    })
    let message = `Post ${postId} successfully deleted...`
    console.log(message);
    res.render('message', { user: user, message: message });
})

router.post('/post-preview', async (req, res) => {
    let authenticated = req.oidc.isAuthenticated();
    let user = req.oidc.user;
    let uploadedFiles = req.files;

    let locationData = { lat: req.query.lat, lon: req.query.lon };
    let postData = req.body;

    // have controller layer in between to return new object with proper location data
    postModel.addPost(postData, locationData, (err, result) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log(result);
        res.redirect(`/posts/${result.post_id}`);
    });
});

router.get('/post-preview/:key', (req, res) => {
  console.log('req.params',req.params);
  const key = req.params.key
  const readStream = getFileStream(key);

  readStream.pipe(res);
})

module.exports = router;