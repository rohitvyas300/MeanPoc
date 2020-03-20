var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Book = require('../app/models/Books');

/*
// Home page route.
router.get('/', function (req, res) {
  res.send('Wiki home page');
})

// About page route.
router.get('/about', function (req, res) {
  res.send('About this wiki');
})
*/

// Home page route.
router.get('/', function (req, res) {
    Book.find(function (err, products) {
        if (err) return next(err);
        res.json(products);
      });
}) 

  
  // About page route.
  router.get('/about', function (req, res) {
    Book.find({ 'author': 'ttd' }, 'title', function (err, products) {
        if (err) return next(err);
          res.json(products);
})

  })
  

/* GET SINGLE BOOK BY author ddddd 
router.get('/', function(req, res, next) {
  Book.find({ 'author': 'ttd' }, 'title', function (err, products) {
    if (err) return next(err);
      res.json(products);
    });
  });   
  
  */




  /* GET SINGLE BOOK BY author ddddd  
router.get('/author', function(req, res, next) {
  //var Athlete = Book;
  Book.find({ 'author': 'ttd' }, 'title', function (err, products) {
    if (err) return next(err);
      res.json(products);
    });
  });   
*/



module.exports = router;
