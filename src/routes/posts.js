const express = require('express');
const router = express.Router();
const dbConnection = require('../dbConnection');
const { auth, requiresAuth } = require('express-openid-connect');
const postModel = require('../models/postModel');
const { post } = require('./user');
const fs = require('fs');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
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

  postModel.getPostById(postId, async (err, results) => {
    if (err) {
      console.log(err);
    } else {
      if (authenticated) {
        const key = results[0].imageKey
        const readStream = await getFileStream(key);
        // readStream.pipe(res);
        console.log('readStream', readStream);

        console.log(results[0])
        res.render('post', { user: user, postData: results[0], image: readStream[0].toString('base64') })
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


router.post('/post-preview', upload.array('imageFiles'), async (req, res) => {
  let authenticated = req.oidc.isAuthenticated();
  let user = req.oidc.user;
  let uploadedFiles = req.files;
  let locationData = { lat: req.query.lat, lon: req.query.lon };
  let postData = req.body;


  const uploadResult = await uploadFile(uploadedFiles);
  uploadedFiles.forEach((files) => {
    unlinkFile(files.path);
  })
  console.log('uploadResult', uploadResult);

  // have controller layer in between to return new object with proper location data
  await postModel.addPost(postData, locationData, (err) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log('New post added to db ' + postData);
  }).then(result => {
    uploadResult.forEach((key) => {
      postModel.addImageKey(postData, key, result, (err) => {
        if(err) {
            console.log(err);
            return;
        }
      })
    })
    res.redirect(`/posts/${result}`)
  });
  console.log('postData', postData);
  res.render('post-preview', { user: user, imagePath: uploadResult });
});

router.get('/post-preview/:key', (req, res) => {
  console.log('req.params', req.params);
  const key = req.params.key
  const readStream = getFileStream(key);

  // readStream.pipe(res);
})

module.exports = router;