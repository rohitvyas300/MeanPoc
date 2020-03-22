var Employee = require('../app/models/EmployeeDetails');

// Display list of all books.
exports.employee_list = function(req, res) {
  Employee.find(function (err, products) {
        if (err) return next(err);
        res.json(products);
      });
};

// Display detail page for a specific book.
exports.employee_detail = function(req, res) {
    console.log("god is great....");
    console.log(req.query.EmpName);
    if(req.query.EmpName == 'Rohit Vyas'){
      Employee.find({ 'EmpName': 'Rohit Vyas' }, 'EmpNum JlEmail MasterCustomer', function (err, products) {
            if (err) return next(err);
              res.json(products);
        });
  }
  if(req.query.author == 'Sing'){
    Employee.find({ 'author': 'Sing' }, 'title', function (err, products) {
        if (err) return next(err);
          res.json(products);
    });
}
  //res.send("tests in pregres");
};

// create new employee.
exports.add_employee = function(req, res,next) {
  Employee.create(req.body, function (err, products) {
        if (err) return next(err);
        res.json(products);
      });
};

// DELETE an employee.
exports.delete_employee = function(req, res,next) {
  console.log("in sisde del acccillll");
  console.log(req.params._id);
  Employee.findByIdAndRemove(req.params._id, req.body, function (err, products){
        if (err) return next(err);
        res.json(products);
      });
};
