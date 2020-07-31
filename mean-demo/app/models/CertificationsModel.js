var mongoose = require('mongoose');

var certification = new mongoose.Schema({
CertificationName : String, 
CertificationCode : String, 
CertificationTitle: String,
Owner: String, 
CertificationType : String,
CompetencyDimension: String,
LexIDs: String,
});

//module.exports = mongoose.model('categories', readcsv_db,'category');
module.exports = mongoose.model('certificate', certification);