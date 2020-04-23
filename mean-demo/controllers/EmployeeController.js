var Employee = require('../app/models/EmployeeDetails');

// Display list of all Employee records.
exports.employee_list = function(req, res) {
  Employee.find(function (err, products) {
        if (err) return next(err);
        res.json(products);
      });
};

// create new employee.
exports.add_employee = function(req, res,next) {
  console.log('inside Add emplioyyeee....')
  //console.log(req.body);
 // console.log(req.body.EmpName,req.body.EmpNum,req.body.Role)
  Employee.create(req.body, function (err, products) {
        if (err) return next(err);
        //res.json(products);
        //res.render('index', { title: 'index', indexpage:products});
        res.redirect('/');
      });
};

// DELETE an employee.
exports.delete_employee = function(req, res,next) {
  //Employee.findOneAndDelete(req.params._id, req.body, function (err, products){
  Employee.findByIdAndRemove(req.query.custId, req.body, function (err, products){
        if (err) return next(err);
        res.redirect('/');
      });
};


// UPDATE an employee.
exports.update_employee = function(req, res,next) {
  console.log('upsdata isiss');
  console.log(req.query.EmpName);
  console.log(req.query.custId);
  Employee.findByIdAndUpdate(req.query.custId, req.query, function (err, products){
        if (err) return next(err);
        res.redirect('/');
      });
};

// Display certification count based on date range.
exports.certificate_count_monthwise = function(req, res,next) {
 // var fromdate = req.body.
  //var todate = req.query.enddate;
  var fromdate = req.query.startdate || '2020-01-01';
  var todate = req.query.enddate || '2020-01-31';
  console.log(fromdate);
  console.log(todate);
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

                                                Employee.find({"DevOpsPlanDate":{$gte:new Date(fromdate), $lt:new Date(todate)}} ,function (err, DevOpsPlanDate) {
                                                if (err) return next(err);
                                                count.DevOpsPlanDate = DevOpsPlanDate.length;
                                                
                                                      Employee.find({"DevOpsActualPlanDate":{$gte:new Date(fromdate), $lt:new Date(todate)}} ,function (err, DevOpsActualPlanDate) {
                                                      if (err) return next(err);
                                                      count.DevOpsActualPlanDate = DevOpsActualPlanDate.length;
                                                      
                                                        Employee.find({"DevOpsCompletionDate":{$gte:new Date(fromdate), $lt:new Date(todate)}} ,function (err, DevOpsCompletionDate) {
                                                          if (err) return next(err);
                                                          count.DevOpsCompletionDate = DevOpsCompletionDate.length;
                                                          console.log('hers ois 9999999999');
                                                         // Object.keys(count).length;
                                                          console.log(Object.keys(count).length );
                                                          console.log(count.AutomationToolActualDate);

                                                          //console.log(count[2]);

                                                          //res.render('tes', { title: 'tes'});
                                                          res.render('monthlyPage', { title: 'monthlyPage', count});
                                                        });
                                                    });
                                              });                                                
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


// Display detail page for a specific book.
exports.singleemployee_detail = function(req, res) {
  // var tt = req.query.custId;
  // console.log(tt);
  Employee.findById(req.params._id, req.body, function (err, products){
          if (err) return next(err);
            res.json(products);
      });
};


// Display detail page for a specific book.
exports.employee_detail = function(req, res) {
    console.log("god is great....");
    console.log(req.query.EmpName);
    if(req.query.EmpName == 'Rohit Vyas'){
      Employee.find({ 'EmpName': 'Rohit Vyas' }, 'EmpNum', function (err, products) {
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

//FrontEnd--------------------------------------
// Display detail page for a specific book.
exports.indexpage =  function(req, res, next) {
  console.log("god is greater....");
    var perPage = 10
    var page = req.query.page || 1
    console.log('pageis '+page);
    console.log(page);
    Employee.find()
    .skip((perPage * page) - perPage)
        .limit(perPage)
        .exec(function(err, products) {
          Employee.countDocuments().exec(function(err, count) {
                if (err) return next(err)
                console.log(count);  
                  res.render('index', {
                  // res.render('tes', {
                    indexpage:products,
                     pages: Math.ceil(count / perPage)
                 })
            })
        });
};

// Display detail page for a specific book.
exports.monthlypage =  function(req, res) {
    res.render('monthlyPage', { title: 'monthhan'});
};

// Display detail page for a specific book.
exports.addaccountpage =  function(req, res) {
    res.render('addaccountPage', { title: 'add'});
};

// Display detail page for a specific book.
exports.singleRecordUpdate_detail = function(req, res) {
   var tt = req.query.custId;
   console.log(tt);
  Employee.findById(req.query.custId, req.body, function (err, products){
          if (err) return next(err);
          res.render('addaccountPage', {'singleRecordData': products});
      });
};





