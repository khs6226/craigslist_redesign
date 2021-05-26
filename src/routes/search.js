const express = require('express');
const router = express.Router();
const dbConnection = require('../dbConnection');
const { searchModel } = require('../models/searchModel');
const { getFileStream } = require('../models/s3');
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
    searchModel(searchParams, async (err, results) => {
      let keySet = [];
        if (err) {
            console.log(err);
            return err;
        } else {
            if (authenticated) {
              await Promise.all(results.map( async (result) => {
                if(result.imageKey) {
                  keySet[0] = result.imageKey;
                  const readStream = await getFileStream(keySet);
                  result.image = readStream[0].toString('base64');
                } else {
                  result.image = undefined;
                }
              }));
                res.render('results', { user: user, posts: results, query: searchParams, filter: { minPrice: minPrice, maxPrice: maxPrice, category: category, condition: condition, location: location }});
            } else {
                res.render('results', { user: false, posts: results, query: searchParams, filter: { minPrice: minPrice, maxPrice: maxPrice, category: category, condition: condition, location: location }});
            }
        }
    });
})

module.exports = router;