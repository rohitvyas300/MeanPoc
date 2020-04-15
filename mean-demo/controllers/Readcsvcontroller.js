const mongodb = require("mongodb").MongoClient;
const csvtojson = require("csvtojson");
const formidable = require('formidable');
const fs = require('fs');
var mv = require('mv');
var csvModel = require('../app/models/ReadCsvModel');

exports.datatodb = async function(req, res) {
  var form =  new formidable.IncomingForm().parse(req, (err, fields, files) => {
    if (err) {
      console.error('Error', err)
      throw err
    }
      if (req.url == '/data') {
        //csvModel.collection.drop();

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
await res.redirect('/upload/showuploadeddata');
};

// Display detail page for a specific book.
exports.uploadPage =  function(req, res) {
  console.log("god is greater....");
  csvModel.collection.drop();  
    res.render('uploadcsv', { title: 'Home Page'});
  //  });
};

// Display detail page for a specific book.
exports.showuploadeddata =  function(req, res, next) {
  console.log("Shri Sai Ram....");
    var perPage = 100
    var page = req.query.page || 1
    console.log('pageis '+page);
    console.log(page);

    csvModel
        .find({})
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .exec(function(err, products) {
          csvModel.countDocuments().exec(function(err, count) {
                if (err) return next(err)
                console.log(count);  
                //res.render('uploadedData', {
                   res.render('tes', {
                   products:products,
                     pages: Math.ceil(count / perPage)
                 })
                //res.render('tes');
            })
        })

/*
  csvModel.find(function (err, products, next) {
          if (err) return next(err);
    console.log(products.length);
    //res.json(products);
    res.render('uploadedData', { title: 'Csvdata Page', indexpage:products});
    });
 */   
  };

