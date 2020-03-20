// Dependencies
var express = require('express');
var router = express.Router();

// Models
var Product = require('../app/models/product');

// Routes
Product.methods(['get', 'put', 'post', 'delete']);
//Product.methods(['put', 'post', 'delete']);
Product.register(router, '/products');
console.log('testtsts')
// Return router
module.exports = router;

