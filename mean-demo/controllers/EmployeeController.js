var Employee = require('../app/models/EmployeeDetails');

// Display list of all books.
exports.employee_list = function(req, res) {
  Employee.find(function (err, products) {
        if (err) return next(err);
        res.json(products);
      });
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


// UPDATE an employee.
exports.update_employee = function(req, res,next) {
  Employee.findByIdAndUpdate(req.params._id, req.body, function (err, products){
        if (err) return next(err);
        res.json(products);
      });
};

// Display list based on date range.
exports.employeeList_month1 = function(req, res) {
  Employee.find({"AgileActualDate":{$gte:new Date('2020-01-01'), $lt:new Date("2020-01-23")}},'EmpNum JlEmail MasterCustomer AgilePlanDate',function (err, products) {
    var count = products.length;
    console.log(count);    
    if (err) return next(err);
        res.json(count);
      });
};


// Display certification count based on date range.
exports.certificate_count_monthwise = function(req, res) {
  var fromdate = req.query.fromdate;
  var todate = req.query.todate;
  var count = {};
  Employee.find({"AgilePlanDate":{$gte:new Date(fromdate), $lt:new Date(todate)}},function (err, AgilePlanDate) {
    if (err) return next(err);
    count.AgilePlanDate = AgilePlanDate.length;
        
        Employee.find({"AgileActualDate":{$gte:new Date(fromdate), $lt:new Date(todate)}} ,function (err, AgileActualDate) {
        if (err) return next(err);
        count.AgileActualDate = AgileActualDate.length;
      
               Employee.find({"AgileCompletionDate":{$gte:new Date(fromdate), $lt:new Date(todate)}} ,function (err, AgileCompletionDate) {
                if (err) return next(err);
                count.AgileCompletionDate = AgileCompletionDate.length;

                    Employee.find({"AutomationToolPlanDate":{$gte:new Date(fromdate), $lt:new Date(todate)}} ,function (err, AutomationToolPlanDate) {
                      if (err) return next(err);
                      count.AutomationToolPlanDate = AutomationToolPlanDate.length;

                          Employee.find({"AutomationToolActualDate":{$gte:new Date(fromdate), $lt:new Date(todate)}} ,function (err, AutomationToolActualDate) {
                          if (err) return next(err);
                          count.AutomationToolActualDate = AutomationToolActualDate.length;

                              Employee.find({"AutomationToolCompletionDate":{$gte:new Date(fromdate), $lt:new Date(todate)}} ,function (err, AutomationToolCompletionDate) {
                                if (err) return next(err);
                                count.AutomationToolCompletionDate = AutomationToolCompletionDate.length;

                                    Employee.find({"PrgLangPlanDate":{$gte:new Date(fromdate), $lt:new Date(todate)}} ,function (err, PrgLangPlanDate) {
                                    if (err) return next(err);
                                    count.PrgLangPlanDate = PrgLangPlanDate.length;

                                        Employee.find({"PrgLangActualDate":{$gte:new Date(fromdate), $lt:new Date(todate)}} ,function (err, PrgLangActualDate) {
                                        if (err) return next(err);
                                        count.PrgLangActualDate = PrgLangActualDate.length;

                                            Employee.find({"PrgLangCompletionDate":{$gte:new Date(fromdate), $lt:new Date(todate)}} ,function (err, PrgLangCompletionDate) {
                                            if (err) return next(err);
                                            count.PrgLangCompletionDate = PrgLangCompletionDate.length;
                                            res.json(count);
                                          });
                                      });
                                  });  
                              });
                          });
                    });
              });
        });
  }); 
};


//db.bios.find( { birth: { $gt: new Date('1940-01-01'), $lt: new Date('1960-01-01') } } )
//find({"OrderDateTime":{ $gte:ISODate("2019-02-10"), $lt:ISODate("2019-02-21") }
//}).pretty();

// Display detail page for a specific book.
exports.employee_detail = function(req, res) {
    console.log("god is great....");
    console.log(req.query.EmpName);
    if(req.query.EmpName == 'Rohit Vyas'){
      Employee.find({ 'EmpName': 'Rohit Vyas' }, 'EmpNum JlEmail MasterCustomer AgilePlanDate', function (err, products) {
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

