var Book = require('../app/models/Books');

// Display list of all books.
exports.book_list = function(req, res) {
    Book.find(function (err, products) {
        if (err) return next(err);
        res.json(products);
      });
};

// Display detail page for a specific book.
exports.book_detail = function(req, res) {
    console.log("god is great....");
    console.log(req.query.author);
    if(req.query.author == 'ttd'){
        Book.find({ 'author': 'ttd' }, 'title', function (err, products) {
            if (err) return next(err);
              res.json(products);
        });
  }
  if(req.query.author == 'Sing'){
    Book.find({ 'author': 'Sing' }, 'title', function (err, products) {
        if (err) return next(err);
          res.json(products);
    });
}
  //res.send("tests in pregres");
};