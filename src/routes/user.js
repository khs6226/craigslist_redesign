const express = require('express');
const router = express.Router();
const dbConnection = require('../dbConnection');
const dbQuery = require('../dbQuery');
const postModel = require('../models/postModel');
const { auth, requiresAuth } = require('express-openid-connect');

router.get('/profile', requiresAuth(), function (req, res) {
    let authenticated = req.oidc.isAuthenticated();
    let user = req.oidc.user;
    console.log(user);
    if (authenticated) {
      dbConnection.getConnection((err, dbConnection) => {
        if(err) {
          console.log('error connecting to MySQL');
          console.log(err);
        } else {
          postModel.getPostByUserId(user.sub, (err, result) => {
            console.log('result', result);
            if(err) {
              console.log('error reading from mysql');
              console.log(err);
            } else {
              res.render('profile', { user: user, posts: result });
            }
          });
          dbConnection.release();
        }
      })
    } else {
      res.redirect('/');
    }
  })

router.get('/posting', requiresAuth(), (req, res) => {
  let authenticated = req.oidc.isAuthenticated();
  let user = req.oidc.user;
  if (authenticated) {
    dbConnection.getConnection((err, dbConnection) => {
      if(err) {
        console.log('error connecting to MySQL');
        console.log(err);
      } else {
        dbQuery.getPost((err, result) => {
          if(err) {
            console.log('error reading from mysql');
            console.log(err);
          } else {
            res.render('posting', { user: user, post: result });
          }
        });
        dbConnection.release();
      }
    })
  } else {
    res.redirect('/');
  }
})

module.exports = router 