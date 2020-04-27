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

exports.test =  function(req, res,next) 
{
  console.log('here i am...0');
  var combinePlanCount = {};
  monthWiseCount = {};
  Employee.aggregate([
    // First Stage
    {
      $match : { "AgilePlanDate": {$gte:new Date("2020-01-01"), $lt: new Date("2021-01-01") } }
    },
    {
      $group : {
        _id : { 
          "agilePlan": { year: { $year : "$AgilePlanDate" }, month: { $month : "$AgilePlanDate" }},
          },
        agilePlanCount: { $sum: 1 }
      }
    },
    ],function (err, result) {
    if (err) {
        console.log(err);
        return;
    }
    console.log('here i am...1');
    combinePlanCount.agilePlanMonthCount = result;
    //res.send(combinePlanCount);

    //----
     //AgileActual date
     Employee.aggregate([
      // First Stage
      {
        $match : { "AgileActualDate": {$gte:new Date("2020-01-01"), $lt: new Date("2021-01-01") } }
      },
      {
        $group : {
          _id : { 
            "agileActual": { year: { $year : "$AgileActualDate" }, month: { $month : "$AgileActualDate" }},
            },
            agileActualcount: { $sum: 1 }
        }
      },
      ],function (err, result2) {
      if (err) {
          console.log(err);
          return;
      }
      console.log('here i am...2');
      combinePlanCount.agileActualMonth = result2;

      Employee.aggregate([
        {
          $match : { "AutomationToolPlanDate": {$gte:new Date("2020-01-01"), $lt: new Date("2021-01-01") } }
        },
        {
          $group : {
            _id : { 
              "automationPlan": { year: { $year : "$AutomationToolPlanDate" }, month: { $month : "$AutomationToolPlanDate" }},
              },
              automationToolPlancount: { $sum: 1 }
          }
        },
        ],function (err, result3) {
        if (err) {
            console.log(err);
            return;
        }
        console.log('here i am...3');
        combinePlanCount.automationPlanMonth = result3;
        Employee.aggregate([
          {
            $match : { "AutomationToolActualDate": {$gte:new Date("2020-01-01"), $lt: new Date("2021-01-01") } }
          },
          {
            $group : {
              _id : { 
                "automationActual": { year: { $year : "$AutomationToolActualDate" }, month: { $month : "$AutomationToolActualDate" }},
                },
                automationToolActualcount: { $sum: 1 }
            }
          },
          ],function (err, result4) {
          if (err) {
              console.log(err);
              return;
          }
          console.log('here i am...4');
          combinePlanCount.automationActualMonth = result4;

          Employee.aggregate([
            {
              $match : { "PrgLangPlanDate": {$gte:new Date("2020-01-01"), $lt: new Date("2021-01-01") } }
            },
            {
              $group : {
                _id : { 
                  "prgLangPlan": { year: { $year : "$PrgLangPlanDate" }, month: { $month : "$PrgLangPlanDate" }},
                  },
                  prgLangPlancount: { $sum: 1 }
              }
            },
            ],function (err, result5) {
            if (err) {
                console.log(err);
                return;
            }
            console.log('here i am...5');
            combinePlanCount.prgLangPlanMonth = result5;

            Employee.aggregate([
              {
                $match : { "PrgLangActualDate": {$gte:new Date("2020-01-01"), $lt: new Date("2021-01-01") } }
              },
              {
                $group : {
                  _id : { 
                    "prgLangActual": { year: { $year : "$PrgLangActualDate" }, month: { $month : "$PrgLangActualDate" }},
                    },
                    prgLangActualcount: { $sum: 1 }
                }
              },
              ],function (err, result6) {
              if (err) {
                  console.log(err);
                  return;
              }
              console.log('here i am...6');
              combinePlanCount.prgLangActualMonth = result6;
              

              Employee.aggregate([
                {
                  $match : {"DevOpsPlanDate": {$gte:new Date("2020-01-01"), $lt: new Date("2021-01-01") } }
                },
                {
                  $group : {
                    _id : { 
                      "devOpsPlan": { year: { $year : "$DevOpsPlanDate"}, month: { $month : "$DevOpsPlanDate"}},
                      },
                      devOpsPlancount: { $sum: 1 }
                  }
                },
                ],function (err, result7) {
                if (err) {
                    console.log(err);
                    return;
                }
                console.log('here i am...7');
                combinePlanCount.devOpsPlanMonth = result7;
                
             // });//End of  DevOpsPlanDate

              Employee.aggregate([
                // First Stage
                {
                  $match : { "DevOpsActualPlanDate": {$gte:new Date("2020-01-01"), $lt: new Date("2021-01-01") } }
                },
                {
                  $group : {
                    _id : { 
                      "devOpsActual": { year: { $year : "$DevOpsActualPlanDate" }, month: { $month : "$DevOpsActualPlanDate" }},
                      },
                      devOpsActualcount: { $sum: 1 }
                  }
                }
                ],function (err, result8) {
                if (err) {
                    console.log(err);
                    //return;
                }
                console.log('here i am...8');
                combinePlanCount.devOpsActualMonth = result8;
               // monthWiseCount = {};
                //Agile plan
                for (i = 0; i < 12; i++) {
                  console.log('here i am...9');
                  if(combinePlanCount.agilePlanMonthCount[i] != null)
                  {
                      var tes = combinePlanCount.agilePlanMonthCount[i]._id.agilePlan.month
                      if(tes ==1)
                      {
                        monthWiseCount.agilePlanJan = combinePlanCount.agilePlanMonthCount[i].agilePlanCount;
                      }
                      if(tes ==2)
                      {
                        monthWiseCount.agilePlanFeb = combinePlanCount.agilePlanMonthCount[i].agilePlanCount;
                      }
                      if(tes ==3)
                      {
                        monthWiseCount.agilePlanMar = combinePlanCount.agilePlanMonthCount[i].agilePlanCount;
                      }
                      if(tes ==4)
                      {
                        monthWiseCount.agilePlanApril = combinePlanCount.agilePlanMonthCount[i].agilePlanCount;
                      }
                      if(tes ==5)
                      {
                        monthWiseCount.agilePlanMay = combinePlanCount.agilePlanMonthCount[i].agilePlanCount;
                      }
                      if(tes ==6)
                      {
                        monthWiseCount.agilePlanJun = combinePlanCount.agilePlanMonthCount[i].agilePlanCount;
                      }
                      if(tes ==7)
                      {
                        monthWiseCount.agilePlanJul = combinePlanCount.agilePlanMonthCount[i].agilePlanCount;
                      }
                      if(tes ==8)
                      {
                        monthWiseCount.agilePlanAug = combinePlanCount.agilePlanMonthCount[i].agilePlanCount;
                      }
                      if(tes ==9)
                      {
                        monthWiseCount.agilePlanSep = combinePlanCount.agilePlanMonthCount[i].agilePlanCount;
                      }
                      if(tes ==10)
                      {
                        monthWiseCount.agilePlanOct = combinePlanCount.agilePlanMonthCount[i].agilePlanCount;
                      }
                      if(tes ==11)
                      {
                        monthWiseCount.agilePlanNov = combinePlanCount.agilePlanMonthCount[i].agilePlanCount;
                      }
                      if(tes ==12)
                      {
                        monthWiseCount.agilePlanDec = combinePlanCount.agilePlanMonthCount[i].agilePlanCount;
                      }
                    }    
                }
              //Agile Actual
                for (i = 0; i < 12; i++) {
                  console.log('here i am...10');
                  if(combinePlanCount.agileActualMonth[i] != null)
                  { 
                    var tes = combinePlanCount.agileActualMonth[i]._id.agileActual.month
                    if(tes ==1)
                    {
                      monthWiseCount.agileActualJan = combinePlanCount.agileActualMonth[i].agileActualcount;
                    }
                    if(tes ==2)
                    {
                      monthWiseCount.agileActualFeb = combinePlanCount.agileActualMonth[i].agileActualcount;
                    }
                    if(tes ==3)
                    {
                      monthWiseCount.agileActualMar = combinePlanCount.agileActualMonth[i].agileActualcount;
                    }
                    if(tes ==4)
                    {
                      monthWiseCount.agileActualApril = combinePlanCount.agileActualMonth[i].agileActualcount;
                    }
                    if(tes ==5)
                    {
                      monthWiseCount.agileActualMay= combinePlanCount.agileActualMonth[i].agileActualcount;
                    }  
                    if(tes ==6)
                    {
                      monthWiseCount.agileActualJun = combinePlanCount.agileActualMonth[i].agileActualcount;
                    }
                    if(tes ==7)
                    {
                      monthWiseCount.agileActualJul = combinePlanCount.agileActualMonth[i].agileActualcount;
                    }
                    if(tes ==8)
                    {
                      monthWiseCount.agileActualAug = combinePlanCount.agileActualMonth[i].agileActualcount;
                    }
                    if(tes ==9)
                    {
                      monthWiseCount.agileActualSep = combinePlanCount.agileActualMonth[i].agileActualcount;
                    }
                    if(tes ==10)
                    {
                      monthWiseCount.agileActualOct = combinePlanCount.agileActualMonth[i].agileActualcount;
                    }
                    if(tes ==11)
                    {
                      monthWiseCount.agileActualNov = combinePlanCount.agileActualMonth[i].agileActualcount;
                    }
                    if(tes ==12)
                    {
                      monthWiseCount.agileActualDec = combinePlanCount.agileActualMonth[i].agileActualcount;
                    }
          
                } 
              }
                //Automation plan
              for (i = 0; i < 12; i++) {
                console.log('here i am...11');
                if(combinePlanCount.automationPlanMonth[i] != null)
                { 
                  var tes = combinePlanCount.automationPlanMonth[i]._id.automationPlan.month
                  if(tes ==1)
                  {
                    monthWiseCount.automationToolPlanJan = combinePlanCount.automationPlanMonth[i].automationToolPlancount;
                  }
                  if(tes ==2)
                  {
                    monthWiseCount.automationToolPlanFeb = combinePlanCount.automationPlanMonth[i].automationToolPlancount;
                  }
                  if(tes ==3)
                  {
                    monthWiseCount.automationToolPlanMar = combinePlanCount.automationPlanMonth[i].automationToolPlancount;
                  }
                  if(tes ==4)
                  {
                    monthWiseCount.automationToolPlanApril = combinePlanCount.automationPlanMonth[i].automationToolPlancount;
                  }
                  if(tes ==5)
                  {
                    monthWiseCount.automationToolPlanMay = combinePlanCount.automationPlanMonth[i].automationToolPlancount;
                  }  
                  if(tes ==6)
                  {
                    monthWiseCount.automationToolPlanJun = combinePlanCount.automationPlanMonth[i].automationToolPlancount;
                  }
                  if(tes ==7)
                  {
                    monthWiseCount.automationToolPlanJul = combinePlanCount.automationPlanMonth[i].automationToolPlancount;
                  }
                  if(tes ==8)
                  {
                    monthWiseCount.automationToolPlanAug = combinePlanCount.automationPlanMonth[i].automationToolPlancount;
                  }
                  if(tes ==9)
                  {
                    monthWiseCount.automationToolPlanSep = combinePlanCount.automationPlanMonth[i].automationToolPlancount;
                  }
                  if(tes ==10)
                  {
                    monthWiseCount.automationToolPlanOct = combinePlanCount.automationPlanMonth[i].automationToolPlancount;
                  }
                  if(tes ==11)
                  {
                    monthWiseCount.automationToolPlanNov = combinePlanCount.automationPlanMonth[i].automationToolPlancount;
                  }
                  if(tes ==12)
                  {
                    monthWiseCount.automationToolPlanDec = combinePlanCount.automationPlanMonth[i].automationToolPlancount;
                  }
                }//if 
              }//End of for 
              //Automation actual
              for (i = 0; i < 12; i++) {
                console.log('here i am...12');
                if(combinePlanCount.automationActualMonth[i] != null)
                { 
                  var tes = combinePlanCount.automationActualMonth[i]._id.automationActual.month
                  if(tes ==1)
                  {
                    monthWiseCount.automationToolActualJan = combinePlanCount.automationActualMonth[i].automationToolActualcount;
                  }
                  if(tes ==2)
                  {
                    monthWiseCount.automationToolActualFeb = combinePlanCount.automationActualMonth[i].automationToolActualcount;
                  }
                  if(tes ==3)
                  {
                    monthWiseCount.automationToolActualMar = combinePlanCount.automationActualMonth[i].automationToolActualcount;
                  }
                  if(tes ==4)
                  {
                    monthWiseCount.automationToolActualApril = combinePlanCount.automationActualMonth[i].automationToolActualcount;
                  }
                  if(tes ==5)
                  {
                    monthWiseCount.automationToolActualMay = combinePlanCount.automationActualMonth[i].automationToolActualcount;
                  }  
                  if(tes ==6)
                  {
                    monthWiseCount.automationToolActualJun = combinePlanCount.automationActualMonth[i].automationToolActualcount;
                  }
                  if(tes ==7)
                  {
                    monthWiseCount.automationToolActualJul = combinePlanCount.automationActualMonth[i].automationToolActualcount;
                  }
                  if(tes ==8)
                  {
                    monthWiseCount.automationToolActualAug = combinePlanCount.automationActualMonth[i].automationToolActualcount;
                  }
                  if(tes ==9)
                  {
                    monthWiseCount.automationToolActualSep = combinePlanCount.automationActualMonth[i].automationToolActualcount;
                  }
                  if(tes ==10)
                  {
                    monthWiseCount.automationToolActualOct = combinePlanCount.automationActualMonth[i].automationToolActualcount;
                  }
                  if(tes ==11)
                  {
                    monthWiseCount.automationToolActualNov = combinePlanCount.automationActualMonth[i].automationToolActualcount;
                  }
                  if(tes ==12)
                  {
                    monthWiseCount.automationToolActualDec = combinePlanCount.automationActualMonth[i].automationToolActualcount;
                  }
                }//if 
              }//End of for
              //Prog language plan
              for (i = 0; i < 12; i++) {
                console.log('here i am...13');
                if(combinePlanCount.prgLangPlanMonth[i] != null)
                { 
                  var tes = combinePlanCount.prgLangPlanMonth[i]._id.prgLangPlan.month
                  if(tes ==1)
                  {
                    monthWiseCount.prgLangPlanJan = combinePlanCount.prgLangPlanMonth[i].prgLangPlancount;
                  }
                  if(tes ==2)
                  {
                    monthWiseCount.prgLangPlanFeb = combinePlanCount.prgLangPlanMonth[i].prgLangPlancount;
                  }
                  if(tes ==3)
                  {
                    monthWiseCount.prgLangPlanMar = combinePlanCount.prgLangPlanMonth[i].prgLangPlancount;
                  }
                  if(tes ==4)
                  {
                    monthWiseCount.prgLangPlanApril = combinePlanCount.prgLangPlanMonth[i].prgLangPlancount;
                  }
                  if(tes ==5)
                  {
                    monthWiseCount.prgLangPlanMay = combinePlanCount.prgLangPlanMonth[i].prgLangPlancount;
                  }  
                  if(tes ==6)
                  {
                    monthWiseCount.prgLangPlanJun = combinePlanCount.prgLangPlanMonth[i].prgLangPlancount;
                  }
                  if(tes ==7)
                  {
                    monthWiseCount.prgLangPlanJul = combinePlanCount.prgLangPlanMonth[i].prgLangPlancount;
                  }
                  if(tes ==8)
                  {
                    monthWiseCount.prgLangPlanAug = combinePlanCount.prgLangPlanMonth[i].prgLangPlancount;
                  }
                  if(tes ==9)
                  {
                    monthWiseCount.prgLangPlanSep = combinePlanCount.prgLangPlanMonth[i].prgLangPlancount;
                  }
                  if(tes ==10)
                  {
                    monthWiseCount.prgLangPlanOct = combinePlanCount.prgLangPlanMonth[i].prgLangPlancount;
                  }
                  if(tes ==11)
                  {
                    monthWiseCount.prgLangPlanNov = combinePlanCount.prgLangPlanMonth[i].prgLangPlancount;
                  }
                  if(tes ==12)
                  {
                    monthWiseCount.prgLangPlanDec = combinePlanCount.prgLangPlanMonth[i].prgLangPlancount;
                  }
                } //if
              }//End of for
              //Prg language actual
              for (i = 0; i < 12; i++) {
                console.log('here i am...14');
                if(combinePlanCount.prgLangActualMonth[i] != null)
                { 
                  var tes = combinePlanCount.prgLangActualMonth[i]._id.prgLangActual.month
                  if(tes ==1)
                  {
                    monthWiseCount.prgLangActualJan = combinePlanCount.prgLangActualMonth[i].prgLangActualcount;
                  }
                  if(tes ==2)
                  {
                    monthWiseCount.prgLangActualFeb = combinePlanCount.prgLangActualMonth[i].prgLangActualcount;
                  }
                  if(tes ==3)
                  {
                    monthWiseCount.prgLangActualMar = combinePlanCount.prgLangActualMonth[i].prgLangActualcount;
                  }
                  if(tes ==4)
                  {
                    monthWiseCount.prgLangActualApril = combinePlanCount.prgLangActualMonth[i].prgLangActualcount;
                  }
                  if(tes ==5)
                  {
                    monthWiseCount.prgLangActualMay = combinePlanCount.prgLangActualMonth[i].prgLangActualcount;
                  }  
                  if(tes ==6)
                  {
                    monthWiseCount.prgLangActualJun = combinePlanCount.prgLangActualMonth[i].prgLangActualcount;
                  }
                  if(tes ==7)
                  {
                    monthWiseCount.prgLangActualJul = combinePlanCount.prgLangActualMonth[i].prgLangActualcount;
                  }
                  if(tes ==8)
                  {
                    monthWiseCount.prgLangActualAug = combinePlanCount.prgLangActualMonth[i].prgLangActualcount;
                  }
                  if(tes ==9)
                  {
                    monthWiseCount.prgLangActualSep = combinePlanCount.prgLangActualMonth[i].prgLangActualcount;
                  }
                  if(tes ==10)
                  {
                    monthWiseCount.prgLangActualOct = combinePlanCount.prgLangActualMonth[i].prgLangActualcount;
                  }
                  if(tes ==11)
                  {
                    monthWiseCount.prgLangActualNov = combinePlanCount.prgLangActualMonth[i].prgLangActualcount;
                  }
                  if(tes ==12)
                  {
                    monthWiseCount.prgLangActualDec = combinePlanCount.prgLangActualMonth[i].prgLangActualcount;
                  }
                } //if
              }//End of for
              //Devoops plan
              for (i = 0; i < 12; i++) {
                console.log('here i am...15');
                if(combinePlanCount.devOpsPlanMonth[i] != null)
                { 
                  var tes = combinePlanCount.devOpsPlanMonth[i]._id.devOpsPlan.month
                  if(tes ==1)
                  {
                    monthWiseCount.devOpsPlanJan = combinePlanCount.devOpsPlanMonth[i].devOpsPlancount;
                  }
                  if(tes ==2)
                  {
                    monthWiseCount.devOpsPlanFeb = combinePlanCount.devOpsPlanMonth[i].devOpsPlancount;
                  }
                  if(tes ==3)
                  {
                    monthWiseCount.devOpsPlanMar = combinePlanCount.devOpsPlanMonth[i].devOpsPlancount;
                  }
                  if(tes ==4)
                  {
                    monthWiseCount.devOpsPlanApril = combinePlanCount.devOpsPlanMonth[i].devOpsPlancount;
                  }
                  if(tes ==5)
                  {
                    monthWiseCount.devOpsPlanMay = combinePlanCount.devOpsPlanMonth[i].devOpsPlancount;
                  }  
                  if(tes ==6)
                  {
                    monthWiseCount.devOpsPlanJun = combinePlanCount.devOpsPlanMonth[i].devOpsPlancount;
                  }
                  if(tes ==7)
                  {
                    monthWiseCount.devOpsPlanJul = combinePlanCount.devOpsPlanMonth[i].devOpsPlancount;
                  }
                  if(tes ==8)
                  {
                    monthWiseCount.devOpsPlanAug = combinePlanCount.devOpsPlanMonth[i].devOpsPlancount;
                  }
                  if(tes ==9)
                  {
                    monthWiseCount.devOpsPlanSep = combinePlanCount.devOpsPlanMonth[i].devOpsPlancount;
                  }
                  if(tes ==10)
                  {
                    monthWiseCount.devOpsPlanOct = combinePlanCount.devOpsPlanMonth[i].devOpsPlancount;
                  }
                  if(tes ==11)
                  {
                    monthWiseCount.devOpsPlanNov = combinePlanCount.devOpsPlanMonth[i].devOpsPlancount;
                  }
                  if(tes ==12)
                  {
                    monthWiseCount.devOpsPlanDec = combinePlanCount.devOpsPlanMonth[i].devOpsPlancount;
                  }
                } //if
              }//End of for
              //devoops Actual
              for (i = 0; i < 12; i++) {
                console.log('here i am...16');
                if(combinePlanCount.devOpsActualMonth[i] != null)
                { 
                  var tes = combinePlanCount.devOpsActualMonth[i]._id.devOpsActual.month
                  if(tes ==1)
                  {
                    monthWiseCount.devOpsActualJan = combinePlanCount.devOpsActualMonth[i].devOpsActualcount;
                  }
                  if(tes ==2)
                  {
                    monthWiseCount.devOpsActualFeb = combinePlanCount.devOpsActualMonth[i].devOpsActualcount;
                  }
                  if(tes ==3)
                  {
                    monthWiseCount.devOpsActualMar = combinePlanCount.devOpsActualMonth[i].devOpsActualcount;
                  }
                  if(tes ==4)
                  {
                    monthWiseCount.devOpsActualApril = combinePlanCount.devOpsActualMonth[i].devOpsActualcount;
                  }
                  if(tes ==5)
                  {
                    monthWiseCount.devOpsActualMay = combinePlanCount.devOpsActualMonth[i].devOpsActualcount;
                  }  
                  if(tes ==6)
                  {
                    monthWiseCount.devOpsActualJun = combinePlanCount.devOpsActualMonth[i].devOpsActualcount;
                  }
                  if(tes ==7)
                  {
                    monthWiseCount.devOpsActualJul = combinePlanCount.devOpsActualMonth[i].devOpsActualcount;
                  }
                  if(tes ==8)
                  {
                    monthWiseCount.devOpsActualAug = combinePlanCount.devOpsActualMonth[i].devOpsActualcount;
                  }
                  if(tes ==9)
                  {
                    monthWiseCount.devOpsActualSep = combinePlanCount.devOpsActualMonth[i].devOpsActualcount;
                  }
                  if(tes ==10)
                  {
                    monthWiseCount.devOpsActualOct = combinePlanCount.devOpsActualMonth[i].devOpsActualcount;
                  }
                  if(tes ==11)
                  {
                    monthWiseCount.devOpsActualNov = combinePlanCount.devOpsActualMonth[i].devOpsActualcount;
                  }
                  if(tes ==12)
                  {
                    monthWiseCount.devOpsActualDec = combinePlanCount.devOpsActualMonth[i].devOpsActualcount;
                  }
                } //ifdevOpsActualDec
              }//End of for
                console.log(monthWiseCount.devOpsActualApril);
                res.render('monthlycount', { title: 'monthlyPage', monthWiseCount});
                //res.send(monthWiseCount);
              });//devoopsActual
              });//End of devoopsPlanDate
            });//End of PrgLangActualDate
          });//End of PrgLangPlanDate
        });//End of AutomationToolActualDate
      });//End of AutomationToolPlanDate
    });//End of Agile Actual
  });//Agileplan fun end
};//end of fun



exports.test33 =  function(req, res,next) 
{
  console.log('here i am...0');
      var combinePlanCount = {};
      monthWiseCount = {};
      Employee.aggregate([
        // First Stage
        {
          $match : { "AgilePlanDate": {$gte:new Date("2020-01-01"), $lt: new Date("2021-01-01") } }
        },
        {
          $group : {
            _id : { 
              "agilePlan": { year: { $year : "$AgilePlanDate" }, month: { $month : "$AgilePlanDate" }},
              },
            agilePlanCount: { $sum: 1 }
          }
        },
        ],function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
        console.log('here i am...1');
        combinePlanCount.agilePlanMonthCount = result;
      });
      //AgileActual date
      Employee.aggregate([
        // First Stage
        {
          $match : { "AgileActualDate": {$gte:new Date("2020-01-01"), $lt: new Date("2021-01-01") } }
        },
        {
          $group : {
            _id : { 
              "agileActual": { year: { $year : "$AgileActualDate" }, month: { $month : "$AgileActualDate" }},
              },
              agileActualcount: { $sum: 1 }
          }
        },
        ],function (err, result2) {
        if (err) {
            console.log(err);
            return;
        }
        console.log('here i am...2');
        combinePlanCount.agileActualMonth = result2;
      });//End of Agile Actual
      Employee.aggregate([
        {
          $match : { "AutomationToolPlanDate": {$gte:new Date("2020-01-01"), $lt: new Date("2021-01-01") } }
        },
        {
          $group : {
            _id : { 
              "automationPlan": { year: { $year : "$AutomationToolPlanDate" }, month: { $month : "$AutomationToolPlanDate" }},
              },
              automationToolPlancount: { $sum: 1 }
          }
        },
        ],function (err, result3) {
        if (err) {
            console.log(err);
            return;
        }
        console.log('here i am...3');
        combinePlanCount.automationPlanMonth = result3;
      });//End of AutomationToolPlanDate
      Employee.aggregate([
        {
          $match : { "AutomationToolActualDate": {$gte:new Date("2020-01-01"), $lt: new Date("2021-01-01") } }
        },
        {
          $group : {
            _id : { 
              "automationActual": { year: { $year : "$AutomationToolActualDate" }, month: { $month : "$AutomationToolActualDate" }},
              },
              automationToolActualcount: { $sum: 1 }
          }
        },
        ],function (err, result4) {
        if (err) {
            console.log(err);
            return;
        }
        console.log('here i am...4');
        combinePlanCount.automationActualMonth = result4;
      });//End of AutomationToolActualDate
      Employee.aggregate([
        {
          $match : { "PrgLangPlanDate": {$gte:new Date("2020-01-01"), $lt: new Date("2021-01-01") } }
        },
        {
          $group : {
            _id : { 
              "prgLangPlan": { year: { $year : "$PrgLangPlanDate" }, month: { $month : "$PrgLangPlanDate" }},
              },
              prgLangPlancount: { $sum: 1 }
          }
        },
        ],function (err, result5) {
        if (err) {
            console.log(err);
            return;
        }
        console.log('here i am...5');
        combinePlanCount.prgLangPlanMonth = result5;
      });//End of PrgLangPlanDate
      Employee.aggregate([
        {
          $match : { "PrgLangActualDate": {$gte:new Date("2020-01-01"), $lt: new Date("2021-01-01") } }
        },
        {
          $group : {
            _id : { 
              "prgLangActual": { year: { $year : "$PrgLangActualDate" }, month: { $month : "$PrgLangActualDate" }},
              },
              prgLangActualcount: { $sum: 1 }
          }
        },
        ],function (err, result6) {
        if (err) {
            console.log(err);
            return;
        }
        console.log('here i am...6');
        combinePlanCount.prgLangActualMonth = result6;
      });//End of PrgLangActualDate
      Employee.aggregate([
        {
          $match : {"DevOpsPlanDate": {$gte:new Date("2020-01-01"), $lt: new Date("2021-01-01") } }
        },
        {
          $group : {
            _id : { 
              "devOpsPlan": { year: { $year : "$DevOpsPlanDate"}, month: { $month : "$DevOpsPlanDate"}},
              },
              devOpsPlancount: { $sum: 1 }
          }
        },
        ],function (err, result7) {
        if (err) {
            console.log(err);
            return;
        }
        console.log('here i am...7');
        combinePlanCount.devOpsPlanMonth = result7;
      });//End of  DevOpsPlanDate
    //to be use in last------------
    Employee.aggregate([
      // First Stage
      {
        $match : { "DevOpsActualPlanDate": {$gte:new Date("2020-01-01"), $lt: new Date("2021-01-01") } }
      },
      {
        $group : {
          _id : { 
            "devOpsActual": { year: { $year : "$DevOpsActualPlanDate" }, month: { $month : "$DevOpsActualPlanDate" }},
            },
            devOpsActualcount: { $sum: 1 }
        }
      }
      ],function (err, result8) {
      if (err) {
          console.log(err);
          //return;
      }
      console.log('here i am...8');
      combinePlanCount.devOpsActualMonth = result8;
     // monthWiseCount = {};
      //Agile plan
      for (i = 0; i < 11; i++) {
        console.log('here i am...9');
        if(combinePlanCount.agilePlanMonthCount[i] != null)
        {
            var tes = combinePlanCount.agilePlanMonthCount[i]._id.agilePlan.month
            if(tes ==1)
            {
              monthWiseCount.agilePlanJan = combinePlanCount.agilePlanMonthCount[i].agilePlanCount;
            }
            if(tes ==2)
            {
              monthWiseCount.agilePlanFeb = combinePlanCount.agilePlanMonthCount[i].agilePlanCount;
            }
            if(tes ==3)
            {
              monthWiseCount.agilePlanMar = combinePlanCount.agilePlanMonthCount[i].agilePlanCount;
            }
            if(tes ==4)
            {
              monthWiseCount.agilePlanApril = combinePlanCount.agilePlanMonthCount[i].agilePlanCount;
            }
            if(tes ==5)
            {
              monthWiseCount.agilePlanMay = combinePlanCount.agilePlanMonthCount[i].agilePlanCount;
            }
            if(tes ==6)
            {
              monthWiseCount.agilePlanJun = combinePlanCount.agilePlanMonthCount[i].agilePlanCount;
            }
            if(tes ==7)
            {
              monthWiseCount.agilePlanJul = combinePlanCount.agilePlanMonthCount[i].agilePlanCount;
            }
            if(tes ==8)
            {
              monthWiseCount.agilePlanAug = combinePlanCount.agilePlanMonthCount[i].agilePlanCount;
            }
            if(tes ==9)
            {
              monthWiseCount.agilePlanSep = combinePlanCount.agilePlanMonthCount[i].agilePlanCount;
            }
            if(tes ==10)
            {
              monthWiseCount.agilePlanOct = combinePlanCount.agilePlanMonthCount[i].agilePlanCount;
            }
            if(tes ==11)
            {
              monthWiseCount.agilePlanNov = combinePlanCount.agilePlanMonthCount[i].agilePlanCount;
            }
            if(tes ==12)
            {
              monthWiseCount.agilePlanDec = combinePlanCount.agilePlanMonthCount[i].agilePlanCount;
            }
          }    
      }
    //Agile Actual
      for (i = 0; i < 11; i++) {
        console.log('here i am...10');
        if(combinePlanCount.agileActualMonth[i] != null)
        { 
          var tes = combinePlanCount.agileActualMonth[i]._id.agileActual.month
          if(tes ==1)
          {
            monthWiseCount.agileActualJan = combinePlanCount.agileActualMonth[i].agileActualcount;
          }
          if(tes ==2)
          {
            monthWiseCount.agileActualFeb = combinePlanCount.agileActualMonth[i].agileActualcount;
          }
          if(tes ==3)
          {
            monthWiseCount.agileActualMar = combinePlanCount.agileActualMonth[i].agileActualcount;
          }
          if(tes ==4)
          {
            monthWiseCount.agileActualApril = combinePlanCount.agileActualMonth[i].agileActualcount;
          }
          if(tes ==5)
          {
            monthWiseCount.agileActualMay= combinePlanCount.agileActualMonth[i].agileActualcount;
          }  
          if(tes ==6)
          {
            monthWiseCount.agileActualJun = combinePlanCount.agileActualMonth[i].agileActualcount;
          }
          if(tes ==7)
          {
            monthWiseCount.agileActualJul = combinePlanCount.agileActualMonth[i].agileActualcount;
          }
          if(tes ==8)
          {
            monthWiseCount.agileActualAug = combinePlanCount.agileActualMonth[i].agileActualcount;
          }
          if(tes ==9)
          {
            monthWiseCount.agileActualSep = combinePlanCount.agileActualMonth[i].agileActualcount;
          }
          if(tes ==10)
          {
            monthWiseCount.agileActualOct = combinePlanCount.agileActualMonth[i].agileActualcount;
          }
          if(tes ==11)
          {
            monthWiseCount.agileActualNov = combinePlanCount.agileActualMonth[i].agileActualcount;
          }
          if(tes ==12)
          {
            monthWiseCount.agileActualDec = combinePlanCount.agileActualMonth[i].agileActualcount;
          }

      } 
    }
      //Automation plan
    for (i = 0; i < 11; i++) {
      console.log('here i am...11');
      if(combinePlanCount.automationPlanMonth[i] != null)
      { 
        var tes = combinePlanCount.automationPlanMonth[i]._id.automationPlan.month
        if(tes ==1)
        {
          monthWiseCount.automationToolPlanJan = combinePlanCount.automationPlanMonth[i].automationToolPlancount;
        }
        if(tes ==2)
        {
          monthWiseCount.automationToolPlanFeb = combinePlanCount.automationPlanMonth[i].automationToolPlancount;
        }
        if(tes ==3)
        {
          monthWiseCount.automationToolPlanMar = combinePlanCount.automationPlanMonth[i].automationToolPlancount;
        }
        if(tes ==4)
        {
          monthWiseCount.automationToolPlanApril = combinePlanCount.automationPlanMonth[i].automationToolPlancount;
        }
        if(tes ==5)
        {
          monthWiseCount.automationToolPlanMay = combinePlanCount.automationPlanMonth[i].automationToolPlancount;
        }  
        if(tes ==6)
        {
          monthWiseCount.automationToolPlanJun = combinePlanCount.automationPlanMonth[i].automationToolPlancount;
        }
        if(tes ==7)
        {
          monthWiseCount.automationToolPlanJul = combinePlanCount.automationPlanMonth[i].automationToolPlancount;
        }
        if(tes ==8)
        {
          monthWiseCount.automationToolPlanAug = combinePlanCount.automationPlanMonth[i].automationToolPlancount;
        }
        if(tes ==9)
        {
          monthWiseCount.automationToolPlanSep = combinePlanCount.automationPlanMonth[i].automationToolPlancount;
        }
        if(tes ==10)
        {
          monthWiseCount.automationToolPlanOct = combinePlanCount.automationPlanMonth[i].automationToolPlancount;
        }
        if(tes ==11)
        {
          monthWiseCount.automationToolPlanNov = combinePlanCount.automationPlanMonth[i].automationToolPlancount;
        }
        if(tes ==12)
        {
          monthWiseCount.automationToolPlanDec = combinePlanCount.automationPlanMonth[i].automationToolPlancount;
        }
      }//if 
    }//End of for 
    //Automation actual
    for (i = 0; i < 11; i++) {
      console.log('here i am...12');
      if(combinePlanCount.automationActualMonth[i] != null)
      { 
        var tes = combinePlanCount.automationActualMonth[i]._id.automationActual.month
        if(tes ==1)
        {
          monthWiseCount.automationToolActualJan = combinePlanCount.automationActualMonth[i].automationToolActualcount;
        }
        if(tes ==2)
        {
          monthWiseCount.automationToolActualFeb = combinePlanCount.automationActualMonth[i].automationToolActualcount;
        }
        if(tes ==3)
        {
          monthWiseCount.automationToolActualMar = combinePlanCount.automationActualMonth[i].automationToolActualcount;
        }
        if(tes ==4)
        {
          monthWiseCount.automationToolActualApril = combinePlanCount.automationActualMonth[i].automationToolActualcount;
        }
        if(tes ==5)
        {
          monthWiseCount.automationToolActualMay = combinePlanCount.automationActualMonth[i].automationToolActualcount;
        }  
        if(tes ==6)
        {
          monthWiseCount.automationToolActualJun = combinePlanCount.automationActualMonth[i].automationToolActualcount;
        }
        if(tes ==7)
        {
          monthWiseCount.automationToolActualJul = combinePlanCount.automationActualMonth[i].automationToolActualcount;
        }
        if(tes ==8)
        {
          monthWiseCount.automationToolActualAug = combinePlanCount.automationActualMonth[i].automationToolActualcount;
        }
        if(tes ==9)
        {
          monthWiseCount.automationToolActualSep = combinePlanCount.automationActualMonth[i].automationToolActualcount;
        }
        if(tes ==10)
        {
          monthWiseCount.automationToolActualOct = combinePlanCount.automationActualMonth[i].automationToolActualcount;
        }
        if(tes ==11)
        {
          monthWiseCount.automationToolActualNov = combinePlanCount.automationActualMonth[i].automationToolActualcount;
        }
        if(tes ==12)
        {
          monthWiseCount.automationToolActualDec = combinePlanCount.automationActualMonth[i].automationToolActualcount;
        }
      }//if 
    }//End of for
    //Prog language plan
    for (i = 0; i < 11; i++) {
      console.log('here i am...13');
      if(combinePlanCount.prgLangPlanMonth[i] != null)
      { 
        var tes = combinePlanCount.prgLangPlanMonth[i]._id.prgLangPlan.month
        if(tes ==1)
        {
          monthWiseCount.prgLangPlanJan = combinePlanCount.prgLangPlanMonth[i].prgLangPlancount;
        }
        if(tes ==2)
        {
          monthWiseCount.prgLangPlanFeb = combinePlanCount.prgLangPlanMonth[i].prgLangPlancount;
        }
        if(tes ==3)
        {
          monthWiseCount.prgLangPlanMar = combinePlanCount.prgLangPlanMonth[i].prgLangPlancount;
        }
        if(tes ==4)
        {
          monthWiseCount.prgLangPlanApril = combinePlanCount.prgLangPlanMonth[i].prgLangPlancount;
        }
        if(tes ==5)
        {
          monthWiseCount.prgLangPlanMay = combinePlanCount.prgLangPlanMonth[i].prgLangPlancount;
        }  
        if(tes ==6)
        {
          monthWiseCount.prgLangPlanJun = combinePlanCount.prgLangPlanMonth[i].prgLangPlancount;
        }
        if(tes ==7)
        {
          monthWiseCount.prgLangPlanJul = combinePlanCount.prgLangPlanMonth[i].prgLangPlancount;
        }
        if(tes ==8)
        {
          monthWiseCount.prgLangPlanAug = combinePlanCount.prgLangPlanMonth[i].prgLangPlancount;
        }
        if(tes ==9)
        {
          monthWiseCount.prgLangPlanSep = combinePlanCount.prgLangPlanMonth[i].prgLangPlancount;
        }
        if(tes ==10)
        {
          monthWiseCount.prgLangPlanOct = combinePlanCount.prgLangPlanMonth[i].prgLangPlancount;
        }
        if(tes ==11)
        {
          monthWiseCount.prgLangPlanNov = combinePlanCount.prgLangPlanMonth[i].prgLangPlancount;
        }
        if(tes ==12)
        {
          monthWiseCount.prgLangPlanDec = combinePlanCount.prgLangPlanMonth[i].prgLangPlancount;
        }
      } //if
    }//End of for
    
   // console.log(combinePlanCount.prgLangActualMonth.length);
    //Prg language actual
    for (i = 0; i < 11; i++) {
      console.log('here i am...15');
      if(combinePlanCount.prgLangActualMonth[i] != null)
      { 
        var tes = combinePlanCount.prgLangActualMonth[i]._id.prgLangActual.month
        if(tes ==1)
        {
          monthWiseCount.prgLangActualJan = combinePlanCount.prgLangActualMonth[i].prgLangActualcount;
        }
        if(tes ==2)
        {
          monthWiseCount.prgLangActualFeb = combinePlanCount.prgLangActualMonth[i].prgLangActualcount;
        }
        if(tes ==3)
        {
          monthWiseCount.prgLangActualMar = combinePlanCount.prgLangActualMonth[i].prgLangActualcount;
        }
        if(tes ==4)
        {
          monthWiseCount.prgLangActualApril = combinePlanCount.prgLangActualMonth[i].prgLangActualcount;
        }
        if(tes ==5)
        {
          monthWiseCount.prgLangActualMay = combinePlanCount.prgLangActualMonth[i].prgLangActualcount;
        }  
        if(tes ==6)
        {
          monthWiseCount.prgLangActualJun = combinePlanCount.prgLangActualMonth[i].prgLangActualcount;
        }
        if(tes ==7)
        {
          monthWiseCount.prgLangActualJul = combinePlanCount.prgLangActualMonth[i].prgLangActualcount;
        }
        if(tes ==8)
        {
          monthWiseCount.prgLangActualAug = combinePlanCount.prgLangActualMonth[i].prgLangActualcount;
        }
        if(tes ==9)
        {
          monthWiseCount.prgLangActualSep = combinePlanCount.prgLangActualMonth[i].prgLangActualcount;
        }
        if(tes ==10)
        {
          monthWiseCount.prgLangActualOct = combinePlanCount.prgLangActualMonth[i].prgLangActualcount;
        }
        if(tes ==11)
        {
          monthWiseCount.prgLangActualNov = combinePlanCount.prgLangActualMonth[i].prgLangActualcount;
        }
        if(tes ==12)
        {
          monthWiseCount.prgLangActualDec = combinePlanCount.prgLangActualMonth[i].prgLangActualcount;
        }
      } //if
    }//End of for
    //Devoops plan
    
    for (i = 0; i < 11; i++) {
      console.log('here i am...16');
      if(combinePlanCount.devOpsPlanMonth[i] != null)
      { 
        var tes = combinePlanCount.devOpsPlanMonth[i]._id.devOpsPlan.month
        if(tes ==1)
        {
          monthWiseCount.devOpsPlanJan = combinePlanCount.devOpsPlanMonth[i].devOpsPlancount;
        }
        if(tes ==2)
        {
          monthWiseCount.devOpsPlanFeb = combinePlanCount.devOpsPlanMonth[i].devOpsPlancount;
        }
        if(tes ==3)
        {
          monthWiseCount.devOpsPlanMar = combinePlanCount.devOpsPlanMonth[i].devOpsPlancount;
        }
        if(tes ==4)
        {
          monthWiseCount.devOpsPlanApril = combinePlanCount.devOpsPlanMonth[i].devOpsPlancount;
        }
        if(tes ==5)
        {
          monthWiseCount.devOpsPlanMay = combinePlanCount.devOpsPlanMonth[i].devOpsPlancount;
        }  
        if(tes ==6)
        {
          monthWiseCount.devOpsPlanJun = combinePlanCount.devOpsPlanMonth[i].devOpsPlancount;
        }
        if(tes ==7)
        {
          monthWiseCount.devOpsPlanJul = combinePlanCount.devOpsPlanMonth[i].devOpsPlancount;
        }
        if(tes ==8)
        {
          monthWiseCount.devOpsPlanAug = combinePlanCount.devOpsPlanMonth[i].devOpsPlancount;
        }
        if(tes ==9)
        {
          monthWiseCount.devOpsPlanSep = combinePlanCount.devOpsPlanMonth[i].devOpsPlancount;
        }
        if(tes ==10)
        {
          monthWiseCount.devOpsPlanOct = combinePlanCount.devOpsPlanMonth[i].devOpsPlancount;
        }
        if(tes ==11)
        {
          monthWiseCount.devOpsPlanNov = combinePlanCount.devOpsPlanMonth[i].devOpsPlancount;
        }
        if(tes ==12)
        {
          monthWiseCount.devOpsPlanDec = combinePlanCount.devOpsPlanMonth[i].devOpsPlancount;
        }
      } //if
    }//End of for
    //devoops Actual
    for (i = 0; i < 11; i++) {
      console.log('here i am...17');
      if(combinePlanCount.devOpsActualMonth[i] != null)
      { 
        var tes = combinePlanCount.devOpsActualMonth[i]._id.devOpsActual.month
        if(tes ==1)
        {
          monthWiseCount.devOpsActualJan = combinePlanCount.devOpsActualMonth[i].devOpsActualcount;
        }
        if(tes ==2)
        {
          monthWiseCount.devOpsActualFeb = combinePlanCount.devOpsActualMonth[i].devOpsActualcount;
        }
        if(tes ==3)
        {
          monthWiseCount.devOpsActualMar = combinePlanCount.devOpsActualMonth[i].devOpsActualcount;
        }
        if(tes ==4)
        {
          monthWiseCount.devOpsActualApril = combinePlanCount.devOpsActualMonth[i].devOpsActualcount;
        }
        if(tes ==5)
        {
          monthWiseCount.devOpsActualMay = combinePlanCount.devOpsActualMonth[i].devOpsActualcount;
        }  
        if(tes ==6)
        {
          monthWiseCount.devOpsActualJun = combinePlanCount.devOpsActualMonth[i].devOpsActualcount;
        }
        if(tes ==7)
        {
          monthWiseCount.devOpsActualJul = combinePlanCount.devOpsActualMonth[i].devOpsActualcount;
        }
        if(tes ==8)
        {
          monthWiseCount.devOpsActualAug = combinePlanCount.devOpsActualMonth[i].devOpsActualcount;
        }
        if(tes ==9)
        {
          monthWiseCount.devOpsActualSep = combinePlanCount.devOpsActualMonth[i].devOpsActualcount;
        }
        if(tes ==10)
        {
          monthWiseCount.devOpsActualOct = combinePlanCount.devOpsActualMonth[i].devOpsActualcount;
        }
        if(tes ==11)
        {
          monthWiseCount.devOpsActualNov = combinePlanCount.devOpsActualMonth[i].devOpsActualcount;
        }
        if(tes ==12)
        {
          monthWiseCount.devOpsActualDec = combinePlanCount.devOpsActualMonth[i].devOpsActualcount;
        }
      } //if
    }//End of for
      //end me 
      //res.render('monthlycount', { title: 'monthlyPage', monthWiseCount});
      //res.render('monthlycount');
      //console.log(monthWiseCount.agilePlanJan);
      //console.log(monthWiseCount.devOpsActualDec);
      res.send(monthWiseCount);
    });//End of AutomationToolActualDate
    //res.send(monthWiseCount); 
};//End of functions 


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

exports.monthlycount =  function(req, res) {
  res.render('monthlycount', { title: 'monthhan'});
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





