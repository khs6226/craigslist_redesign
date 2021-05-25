const express = require('express');
const router = express.Router();
const dbConnection = require('../dbConnection');
const { auth, requiresAuth } = require('express-openid-connect');
const postModel = require('../models/postModel');
const { post } = require('./user');
const fs = require('fs');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const util = require('util');
const unlinkFile = util.promisify(fs.unlink);
const { check, validationResult  } = require('express-validator');


const { uploadFile, getFileStream } = require('../models/S3');
const { create } = require('domain');


router.get('/new-post', (req, res) => {
  let authenticated = req.oidc.isAuthenticated();
  let user = req.oidc.user;
  res.render('new-post', { user: user, errors: false });
})

router.get('/:id', (req, res) => {
  let authenticated = req.oidc.isAuthenticated();
  let user = req.oidc.user;

  let postId = req.params.id;
  console.log('postId', postId);

  postModel.getPostById(postId, async (err, results) => {
    console.log('getPostResult', results);
    const keySet = [];
    results.forEach((img) => {
      keySet.push(img.imageKey);
    })
    const key = results[0].imageKey;
    const readStream = await getFileStream(keySet).catch(err => err);
    console.log('readStream', readStream);

    let images = [];
    if (results[0].imageKey) {
      readStream.forEach((buffer) => {
        images.push(buffer.toString('base64'));
      })
    } else {
      images = undefined;
    }
  
    if (err) {
      console.log(err);
    } else {
      if (user) {  
          console.log(results[0])
          res.render('post', { user: user, postData: results[0], images: images })
      } else {
        res.render('post', { user: false, images: images , postData: results[0] })
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


router.post('/post-preview', upload.array('imageFiles'), [
  // form validation
  check('category', 'choose a relevant category')
    .exists(),
  check('city', 'choose the region nearest to you')
    .exists(),
  check('title', 'enter a title for your post')
    .exists()
    .isLength({ min: 1 }),
  check('price', 'price must be a valid number')
    .exists()
    .isNumeric(),
  check('description', 'include a post description')
    .exists()
    .isLength({ min: 1 }),
  check('email', 'enter a valid email address')
    .exists()
    .isEmail(),
  check('lat', 'location required')
    .exists()
], async (req, res) => {
  let authenticated = req.oidc.isAuthenticated();
  let user = req.oidc.user;
  let uploadedFiles = req.files;
  let locationData = { lat: req.query.lat, lon: req.query.lon };
  let postData = req.body;
  const errors = validationResult(req);

  if(!errors.isEmpty()) {
    let errMsg = errors.array();
    res.render('new-post', { user: user, errors: errMsg });
    return;
  } else {
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
      console.log('addPostResult', result);
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
    // res.render('post-preview', { user: user, imagePath: uploadResult });
  }
});

router.get('/post-preview/:key', (req, res) => {
  console.log('req.params', req.params);
  const key = req.params.key
  const readStream = getFileStream(key);

  // readStream.pipe(res);
})

module.exports = router;