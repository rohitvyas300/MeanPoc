var mongoose = require('mongoose');

var SDETSchema = new mongoose.Schema({
  EmpNum: String,
  EmpName: String,
  Source: String,
  AssignAccount: String,
  JlEmail: String,
  MasterCustomer: String,
  Portfolio: String,
  DU:String,
  AccountSpoke:String
});

module.exports = mongoose.model('Employee', SDETSchema);