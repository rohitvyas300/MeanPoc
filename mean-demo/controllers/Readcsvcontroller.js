const mongodb = require("mongodb").MongoClient;
const csvtojson = require("csvtojson");
const formidable = require('formidable');
const fs = require('fs');
var mv = require('mv');



// let url = "mongodb://username:password@localhost:27017/";
let url = "mongodb://localhost:27017/";

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
                      //.fromFile("D://rohit//CertData//ER_Mar2.csv")
                      .then(csvData => {
                        //console.log(csvData);
                    
                        mongodb.connect(
                          url,
                          { useNewUrlParser: true, useUnifiedTopology: true },
                          (err, client) => {
                            if (err) throw err;
                    
                            client
                              .db("readcsv_db")
                              .collection("category")
                              .insertMany(csvData, (err, res) => {
                                if (err) throw err;
                                //var count = res.length;
                                console.log(res.insertedCount); 
                                //console.log('Inserted: ${res.insertedCount} rows');
                                client.close();
                              });
                          }
                        );
                      });
                });
            }); 
        });
}
})
  res.redirect('/');
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