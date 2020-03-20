var mongoose = require('mongoose');

var BookSchema = new mongoose.Schema({
  isbn: String,
  title: String,
  author: String,
  description: String,
  published_year: String,
  updated_date: String,
});

module.exports = mongoose.model('Books', BookSchema);