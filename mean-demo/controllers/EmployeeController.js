var Employee = require('../app/models/EmployeeDetails');
var db = require('../config/db');

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


exports.test4 =  function(req, res,next) {
  Employee.aggregate([
  { '$facet': {
      'counts': [
          { '$group': { 
              '_id': null,             
              'fin': {
                  '$sum': {
                    //_id: {$month: "$AgilePlanDate"}, 
                      '$cond': [  {$month: "$AgilePlanDate"}, 1, 0 ]
                      //'$cond': [ { '$eq': [ '$status', 'F' ] }, 1, 0 ]
                  }
              },
              'ea': {
                  '$sum': {
                   // _id: {$month: "$AgileActualDate"},
                   '$cond': [ {$month: "$AgileActualDate"}, 1, 0 ]
                      //'$cond': [ { '$eq': [ '$status', 'EA' ] }, 1, 0 ]
                      
                  }
              }
          } 
        }
      ],
      'monthly': [
          { 
            '$group': { 
              '_id': { 
                  'year': { '$year': '$date' },
                  'month': { '$month': '$date' }
              },
              'sum': { '$sum':  1 }
          } 
        },
          {  '$group': {
              '_id': null,
              'items': { '$push':  '$$ROOT' }
          } },
      ]
  } },
  { '$replaceRoot': { 
      'newRoot': { 
          '$mergeObjects': { 
              '$concatArrays': ['$counts', '$monthly'] 
          } 
      } 
  } }
]).exec((err, results) => {
  const data = results[0];
  console.log(data);

 // res.render('home', { user: req.user, ...data });
})

};


exports.test3 =  function(req, res,next) {
  Employee.aggregate([
    { '$facet': {
        'counts': [
          { '$group': {
                   _id : { year: { $year : "$AgilePlanDate" }, month: { $month : "$AgilePlanDate" }}, 
                   countPlan : { $sum : 1 }
                },
            }      
        ],
        'monthly': [
            {     
              '$group': {
                _id : { year: { $year : "$AgileActualDate" }, month: { $month : "$AgileActualDate"}}, 
                countActual : { $sum : 1 }
             },

          },
            {  '$group': {
                '_id': null,
                'items': { '$push':  '$$ROOT' }
            } },
        ]
    } },
    { '$replaceRoot': { 
        'newRoot': { 
            '$mergeObjects': { 
                '$concatArrays': ['$counts', '$monthly'] 
            } 
        } 
    } }
  ]).exec((err, results) => {
    const data = results[0];
    const data1 = results[1];

    console.log(data);
    console.log(data1);
    res.send(data);
     // res.render('home', { user: req.user, ...data });
})

};



exports.test4 =  function(req, res,next) {
  Employee.aggregate([
    {
      $match: { AgilePlanDate: { $exists:true, $ne: null }}},
      {
          $group : { 
         _id : { year: { $year : "$AgilePlanDate" }, month: { $month : "$AgilePlanDate" }}, 
         count : { $sum : 1 }}
       }, 
       {
       $match: { AgileActualDate: { $exists:true, $ne: null }}},
      {
          $group : { 
         _id : { year: { $year : "$AgileActualDate" }, month: { $month : "$AgileActualDate" }}, 
         count1 : { $sum : 1 }},
         //dailyusage: { $push: { day: "$_id.count1", count: "$count" }}
       },
    // { 
    //   $group : { 
    //      _id : { year: "$_id.year", month: "$_id.month" }, 
    //      dailyusage: { $push: { day: "$_id.day", count: "$count" }}}
    //    }, 
        ], 
    function (err, resa)
         { if (err) ; // TODO handle error 
           console.log(resa.length); 
           console.log(resa.dailyusage); 
           res.send(resa);
         });
    };     

exports.test =  function(req, res,next) {
  var Plan = {};
  Employee.aggregate([
    // First Stage
    {
      $match : { "AgilePlanDate": {$gte:new Date("2020-01-01"), $lt: new Date("2021-01-01") } }
    },
    {
      $group : {
         _id : { 
          "books": { year: { $year : "$AgilePlanDate" }, month: { $month : "$AgilePlanDate" }},
          },
        // totalSaleAmount: { $month : "$AgilePlanDate"},
         //averageQuantity: { $avg: "$quantity" },
         count: { $sum: 1 }
      }
    },
    // Third Stage
    //{
     // $sort : { totalSaleAmount : -1 }
   // }
    // Second Stage
    ],function (err, result) {
    if (err) {
        console.log(err);
        return;
    }
    //console.log(result);
     Plan.agP = result;
    //res.send(result);
  }); 



  Employee.aggregate([
    // First Stage
    {
      $match : { "AgileActualDate": {$gte:new Date("2020-01-01"), $lt: new Date("2021-01-01") } }
    },
    {
      $group : {
         _id : { 
          "books2": { year: { $year : "$AgileActualDate" }, month: { $month : "$AgileActualDate" }},
          },
         //totalSaleAmount: { $sum:"AgilePlanDate"},
         //averageQuantity: { $avg: "$quantity" },
         count2: { $sum: 1 }
      }
    },
    // Third Stage
    {
      $sort : { AgileActualDate: -1,   }
    }
    // Second Stage
    ],function (err, result2) {
    if (err) {
        console.log(err);
        return;
    }
    //console.log(result2);
   
    Plan.agA = result2;
    monthwise = {};

    for (i = 0; i < 3; i++) {
     var tes = Plan.agA[i]._id.books2.month
     if(tes ==1)
     {
       monthwise.AAjan = Plan.agA[i].count2;
     }
     if(tes ==2)
     {
      monthwise.AAfeb = Plan.agA[i].count2;
     }
     if(tes ==3)
     {
      monthwise.AAmar = Plan.agA[i].count2;
     }
    }
    for (i = 0; i < 3; i++) {
      var tes = Plan.agP[i]._id.books.month
      if(tes ==1)
      {
        monthwise.APjan = Plan.agP[i].count;
      }
      if(tes ==2)
      {
       monthwise.APfeb = Plan.agP[i].count;
      }
      if(tes ==3)
      {
       monthwise.APmar = Plan.agP[i].count;
      }
     }
    console.log(monthwise);
    console.log(Plan.agP[0].count);
    //console.log(Plan.agA[1]._id.books2.month);
    //console.log(Plan.agA[2]._id.books2.month);
    //res.send(result);
    res.send(monthwise);
  }); 

 
}; 

exports.test2 =  function(req, res,next) {
 // ids = _id.map(function(el) { 
   // return mongoose.Types.ObjectId(el) 
  //})

  let TODAY = "2020-01-01T23:59:59"
let YEAR_BEFORE = "2020-01-31T00:00:00"
//let req = { params: { productId: 1 } }
const monthsArray = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ]

Employee.aggregate( [
  { 
      $match: {  
        _id: { $gte: YEAR_BEFORE, $lte: TODAY }
      }
  },
  { 
      $group: {
          _id: { "year_month": { $substrCP: [ "$AgilePlanDate", 0, 7 ] } }, 
          count: { $sum: 1 }
      } 
  },
  {
      $sort: { "_id.year_month": 1 }
  },
  { 
      $project: { 
          _id: 0, 
          count: 1, 
          month_year: { 
              $concat: [ 
                 { $arrayElemAt: [ monthsArray, { $subtract: [ { $toInt: { $substrCP: [ "$_id.year_month", 5, 2 ] } }, 1 ] } ] },
                 "-", 
                 { $substrCP: [ "$_id.year_month", 0, 4 ] }
              ] 
          }
      } 
  },
  { 
      $group: { 
          _id: null, 
          data: { $push: { k: "$month_year", v: "$count" } }
      } 
  },
  {
      $project: { 
          data: { $arrayToObject: "$data" }, 
          _id: 0 
      } 
  }
],function (err, result) {
  if (err) {
      console.log(err);
      return;
  }
  console.log(result);
  res.send(result);
});


};


// UPDATE an employee.
exports.test1 =  function(req, res,next) {
  console.log('inside function...');
  var i;
  //var Planing = [[],[]];
  var monthfrom = ['2020-01-01','2020-02-01','2020-03-01','2020-04-01','2020-05-01','2020-06-01','2020-07-01','2020-08-01','2020-09-01','2020-10-01','2020-11-01','2020-12-01'];
  var monthto = ['2020-01-31','2020-02-28','2020-03-31','2020-04-30','2020-05-31','2020-06-30','2020-07-31','2020-08-31','2020-09-30','2020-10-31','2020-11-30','2020-12-31'];

  //var monthfrom = ['2019-01-01','2019-02-01','2019-03-01','2019-04-01','2019-05-01','2019-06-01','2019-07-01','2019-08-01','2019-09-01','2019-10-01','2019-11-01','2019-12-01'];
  //var monthto = ['2019-01-31','2019-02-28','2019-03-31','2019-04-30','2019-05-31','2019-06-30','2019-07-31','2019-08-31','2019-09-30','2019-10-31','2019-11-30','2019-12-31'];

  //var Actual = [];
  var Plan = {};

for (i = 0; i < 3; i++) {
    //for (j = i; j < i+1; j++) {
  //console.log(i);
  var AgilePlanDate1 =  Employee.count({AgilePlanDate:{$gte:new Date(monthfrom[i]), $lt:new Date(monthto[i])} });
  var AgileActualDate1 =  Employee.count({AgileActualDate :{$gte:new Date(monthfrom[i]), $lt:new Date(monthto[i])} }).catch(e => console.log('Error: ', e.message));
  var AgileCompletionDate1 =  Employee.count({AgileCompletionDate :{$gte:new Date(monthfrom[i]), $lt:new Date(monthto[i])} }).catch(e => console.log('Error: ', e.message));
  var AutomationToolPlanDate1 =  Employee.count({AutomationToolPlanDate :{$gte:new Date(monthfrom[i]), $lt:new Date(monthto[i])} }).catch(e => console.log('Error: ', e.message));
  var AutomationToolActualDate1 =  Employee.count({AutomationToolActualDate :{$gte:new Date(monthfrom[i]), $lt:new Date(monthto[i])} }).catch(e => console.log('Error: ', e.message));
  var AutomationToolCompletionDate1 =  Employee.count({AutomationToolCompletionDate :{$gte:new Date(monthfrom[i]), $lt:new Date(monthto[i])} }).catch(e => console.log('Error: ', e.message));
  var PrgLangPlanDate1 =  Employee.count({PrgLangPlanDate :{$gte:new Date(monthfrom[i]), $lt:new Date(monthto[i])} }).catch(e => console.log('Error: ', e.message));
 var PrgLangActualDate1 =  Employee.count({PrgLangActualDate :{$gte:new Date(monthfrom[i]), $lt:new Date(monthto[i])} }).catch(e => console.log('Error: ', e.message));
  var PrgLangCompletionDate1 =  Employee.count({PrgLangCompletionDate :{$gte:new Date(monthfrom[i]), $lt:new Date(monthto[i])} }).catch(e => console.log('Error: ', e.message));
  var DevOpsPlanDate1 =  Employee.count({DevOpsPlanDate :{$gte:new Date(monthfrom[i]), $lt:new Date(monthto[i])} }).catch(e => console.log('Error: ', e.message));
  var DevOpsActualPlanDate1 =  Employee.count({DevOpsActualPlanDate :{$gte:new Date(monthfrom[i]), $lt:new Date(monthto[i])} }).catch(e => console.log('Error: ', e.message));
  var BDDPlanDate1 =  Employee.count({BDDPlanDate :{$gte:new Date(monthfrom[i]), $lt:new Date(monthto[i])} }).catch(e => console.log('Error: ', e.message));
  var BDDPActualPlanDate1 =  Employee.count({BDDPActualPlanDate :{$gte:new Date(monthfrom[i]), $lt:new Date(monthto[i])} }).catch(e => console.log('Error: ', e.message));
  var BDDCompletionDate1 =  Employee.count({BDDCompletionDate :{$gte:new Date(monthfrom[i]), $lt:new Date(monthto[i])} }).catch(e => console.log('Error: ', e.message));
  var PrgLangActualDate =  Employee.count({PrgLangActualDate :{$gte:new Date('2020-04-01'), $lt:new Date('2020-04-30')} });
  var PrgLangActualDate =  Employee.count({PrgLangActualDate :{$gte:new Date('2020-04-01'), $lt:new Date('2020-04-30')} });
        console.log(i);
        Plan[i] = {AgilePlanDate1};

      //  Plan[i] = {AgilePlanDate1,AgileActualDate1,AgileCompletionDate1,AutomationToolPlanDate1,
      //   AutomationToolActualDate1,AutomationToolActualDate1,AutomationToolCompletionDate1,PrgLangPlanDate1,
      //   PrgLangActualDate1,PrgLangCompletionDate1,DevOpsPlanDate1,DevOpsActualPlanDate1,BDDPlanDate1,BDDPActualPlanDate1,
      //   BDDCompletionDate1};    
  }
  res.json(Plan.agP,Plan.agA);
};



// Display certification count based on date range.
//exports.certificate_count_monthwise = function(req, res,next) {
 function testing (req, res,next) {
  // var fromdate = req.body.
   //var todate = req.query.enddate;
   
   //var fromdate = req.params.startdate || '2020-01-01';
   //var str = "T00:00:00.000Z";
  // var todate = req.params.enddate  || '2020-01-31';
   //var fromdate = req.query.startdate || '2020-01-01';
   //var todate = req.query.enddate  || '2020-01-31';
   fromdate ='2020-01-01';
    todate = '2020-01-31';
   console.log(fromdate);
   console.log(todate);
   var count = {};
   Employee.find({"AgilePlanDate":{$gte:new Date(fromdate), $lt:new Date(todate)}},function (err, AgilePlanDate) {
     if (err) return next(err);
     count.AgilePlanDate = AgilePlanDate.length;
         console.log(count)
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
                                                          // res.json(count);
                                                          console.log('value returned...');
                                                          return count;
                                                           //res.render('monthlyPage', { title: 'monthlycount', count});
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
   //res.render('monthlyPage', { title: 'monthlyPage', count});
   //res.send(count);
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





