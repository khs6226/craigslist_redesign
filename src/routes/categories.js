const express = require('express');
const router = express.Router();
const dbConnection = require('../dbConnection');
const postModel = require('../models/postModel');
const { getFileStream } = require('../models/S3');

const { auth, requiresAuth } = require('express-openid-connect');
const { categorySearch } = require('../models/searchModel');

router.get('/', (req, res) => {
    let user = req.oidc.user;
    res.render('explore', { user: user })
})

router.get('/:category', (req, res) => {
    let user = req.oidc.user;
    
    let category = req.params.category;
    postModel.getPostByCategory(category, async (err, results) => {
        if (err) {
            console.log(err); 
            return;
        }
        let keySet = [];
        await Promise.all(results.map( async (result) => {
          if(result.imageKey) {
            keySet[0] = result.imageKey;
            const readStream = await getFileStream(keySet);
            result.image = readStream[0].toString('base64');
          } else {
            result.image = undefined;
          }
        }));
        console.log(results);
        res.render('category', { user: user, category: category, posts: results })
    });
})

router.get('/:category/results', (req, res) => {
    let user = req.oidc.user;

    let searchParams = req.query.query;
    let category = req.params.category;
    categorySearch(searchParams, category, async (err, results) => {
        if (err) {
            console.log(err);
            return;
        }
        let keySet = [];
        await Promise.all(results.map( async (result) => {
          if(result.imageKey) {
            keySet[0] = result.imageKey;
            const readStream = await getFileStream(keySet);
            result.image = readStream[0].toString('base64');
          } else {
            result.image = undefined;
          }
        }));
        console.log(results);
        res.render('category', { user: user, category: category, posts: results });
    });

});

module.exports = router;