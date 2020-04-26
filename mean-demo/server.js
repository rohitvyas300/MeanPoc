// modules =================================================
const express = require('express');
const app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
const formidable = require('formidable');

// set our port
const port = 3000;

// config files
var db = require('./config/db');
console.log("connecting--",db);
mongoose.connect(db.url); //Mongoose connection created


app.set('view engine', 'pug');
// Express
//var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// frontend routes =========================================================
//app.get('/', (req, res) => res.send('Welcome to Tutorialspoint!'));

// Routes
app.use('/', require('./routes/catalog'));
app.use('/upload', require('./routes/readcsvroute'));

// startup our app at http://localhost:3000
app.listen(port, () => console.log('Example app listening on port ${port}!'));


