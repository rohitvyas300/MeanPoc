// modules =================================================
const express = require('express');
const app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

// set our port
const port = 3000;

// config files
var db = require('./config/db');
console.log("connecting--",db);
mongoose.connect(db.url); //Mongoose connection created


// Express
//var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// frontend routes =========================================================
//app.get('/', (req, res) => res.send('Welcome to Tutorialspoint!'));

// Routes
app.use('/api', require('./routes/api'));

app.use('/book', require('./routes/books'));

//app.use('/author', require('./routes/books'));
app.use('/catalog', require('./routes/catalog'));

// grab the student model we just created
var Student = require('./app/models/students');
app.get('/api/students', function(req, res) {
   // use mongoose to get all students in the database
   Student.find(function(err, students) {
      // if there is an error retrieving, send the error.
      // nothing after res.send(err) will execute
      if (err)
         res.send(err);
      res.json(students); // return all students in JSON format
   });
});


// startup our app at http://localhost:3000
app.listen(port, () => console.log('Example app listening on port ${port}!'));