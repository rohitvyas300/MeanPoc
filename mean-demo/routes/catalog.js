var express = require('express');
var router = express.Router();

// Require controller modules.
var book_controller = require('../controllers/bookController');


/// BOOK ROUTES ///

// GET request for one Book.
router.get('/about', book_controller.book_detail);

// GET request for list of all Book items.
router.get('/', book_controller.book_list);

module.exports = router;