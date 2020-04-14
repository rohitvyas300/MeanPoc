const mongodb = require("mongodb").MongoClient;
const csvtojson = require("csvtojson");
const formidable = require('formidable');
const fs = require('fs');
var mv = require('mv');
var csvModel = require('../app/models/ReadCsvModel');

exports.datatodb = function(req, res) {
  var form =  new formidable.IncomingForm().parse(req, (err, fields, files) => {
    if (err) {
      console.error('Error', err)
      throw err
    }
      if (req.url == '/data') {
        var oldPath = files.file.path;
        var newPath = __dirname + '/file_upload/' + files.file.name;
        console.log(newPath);
        fs.readFile(oldPath , function(err, data) {
            fs.writeFile(newPath, data, function(err) {
                fs.unlink(oldPath, function(){
                    if(err) throw err;
                    //res.send("File uploaded to: " + newPath);

                    console.log('this is 1223334444455...');
                    csvtojson()
                        .fromFile(newPath)
                      //.then(csvData => {
                        .then(jsonObj => {
                        console.log(jsonObj);
                    
                        csvModel.insertMany(jsonObj,(err,data)=>{  
                          if(err){  
                              console.log(err);  
                          }
                          // else{  
                          //     res.redirect('/');  
                          // }  
                          });  
                      });
                });
            }); 
        });
}
})
  res.redirect('/upload/showuploadeddata');
};


// Display detail page for a specific book.
exports.uploadPage =  function(req, res) {
  console.log("god is greater....");
  //mongodb.readcsv_db.find(function (err, products) {
         // if (err) return next(err);
    //console.log(products.length);
    //res.render('index', { title: 'index', indexpage:products});
    res.render('uploadcsv', { title: 'Home Page'});
  //  });
};



// Display detail page for a specific book.
exports.showuploadeddata =  function(req, res, next) {
  console.log("Shri Sai Ram....");
  csvModel.find(function (err, products) {
          if (err) return next(err);
    console.log(products.length);
    //res.render('index', { title: 'index', indexpage:products});
    //res.render('index', { title: 'Home Page', indexpage:products});
    res.json(products);
    });
};