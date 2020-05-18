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

exports.certificate_count_monthwise =  function(req, res,next) 
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
               monthWiseCount.JanPlanTotal = monthWiseCount.agilePlanJan+monthWiseCount.automationToolPlanJan+monthWiseCount.prgLangPlanJan+monthWiseCount.devOpsPlanJan;
               monthWiseCount.JanActualTotal = monthWiseCount.agileActualJan+monthWiseCount.automationToolActualJan+monthWiseCount.prgLangActualJan+monthWiseCount.devOpsActualJan;
                
               monthWiseCount.FebPlanTotal = monthWiseCount.agilePlanFeb+monthWiseCount.automationToolPlanFeb+monthWiseCount.prgLangPlanFeb+monthWiseCount.devOpsPlanFeb;
               monthWiseCount.FebActualTotal = monthWiseCount.agileActualFeb+monthWiseCount.automationToolActualFeb+monthWiseCount.prgLangActualFeb+monthWiseCount.devOpsActualFeb;

               monthWiseCount.MarPlanTotal = monthWiseCount.agilePlanMar+monthWiseCount.automationToolPlanMar+monthWiseCount.prgLangPlanMar+monthWiseCount.devOpsPlanMar;
               monthWiseCount.MarActualTotal = monthWiseCount.agileActualMar+monthWiseCount.automationToolActualMar+monthWiseCount.prgLangActualMar+monthWiseCount.devOpsActualMar;

               monthWiseCount.AprilPlanTotal = monthWiseCount.agilePlanApril+monthWiseCount.automationToolPlanApril+monthWiseCount.prgLangPlanApril+monthWiseCount.devOpsPlanApril;
               monthWiseCount.AprilActualTotal = monthWiseCount.agileActualApril+monthWiseCount.automationToolActualApril+monthWiseCount.prgLangActualApril+monthWiseCount.devOpsActualApril;
              
               monthWiseCount.MayPlanTotal = monthWiseCount.agilePlanMay+monthWiseCount.automationToolPlanMay+monthWiseCount.prgLangPlanMay+monthWiseCount.devOpsPlanMay;
               monthWiseCount.MayActualTotal = monthWiseCount.agileActualMay+monthWiseCount.automationToolActualMay+monthWiseCount.prgLangActualMay+monthWiseCount.devOpsActualMay;

               monthWiseCount.JunPlanTotal = monthWiseCount.agilePlanJun+monthWiseCount.automationToolPlanJun+monthWiseCount.prgLangPlanJun+monthWiseCount.devOpsPlanJun;
               monthWiseCount.JunActualTotal = monthWiseCount.agileActualJun+monthWiseCount.automationToolActualJun+monthWiseCount.prgLangActualJun+monthWiseCount.devOpsActualJun;

               monthWiseCount.JulPlanTotal = monthWiseCount.agilePlanJul+monthWiseCount.automationToolPlanJul+monthWiseCount.prgLangPlanJul+monthWiseCount.devOpsPlanJul;
               monthWiseCount.JulActualTotal = monthWiseCount.agileActualJul+monthWiseCount.automationToolActualJul+monthWiseCount.prgLangActualJul+monthWiseCount.devOpsActualJul;

               monthWiseCount.AugPlanTotal = monthWiseCount.agilePlanAug+monthWiseCount.automationToolPlanAug+monthWiseCount.prgLangPlanAug+monthWiseCount.devOpsPlanAug;
               monthWiseCount.AugActualTotal = monthWiseCount.agileActualAug+monthWiseCount.automationToolActualAug+monthWiseCount.prgLangActualAug+monthWiseCount.devOpsActualAug;

               monthWiseCount.SepPlanTotal = monthWiseCount.agilePlanSep+monthWiseCount.automationToolPlanSep+monthWiseCount.prgLangPlanSep+monthWiseCount.devOpsPlanSep;
               monthWiseCount.SepActualTotal = monthWiseCount.agileActualSep+monthWiseCount.automationToolActualSep+monthWiseCount.prgLangActualSep+monthWiseCount.devOpsActualSep;

               monthWiseCount.OctPlanTotal = monthWiseCount.agilePlanOct+monthWiseCount.automationToolPlanOct+monthWiseCount.prgLangPlanOct+monthWiseCount.devOpsPlanOct;
               monthWiseCount.OctActualTotal = monthWiseCount.agileActualOct+monthWiseCount.automationToolActualOct+monthWiseCount.prgLangActualOct+monthWiseCount.devOpsActualOct;

               monthWiseCount.NovPlanTotal = monthWiseCount.agilePlanNov+monthWiseCount.automationToolPlanNov+monthWiseCount.prgLangPlanNov+monthWiseCount.devOpsPlanNov;
               monthWiseCount.NovActualTotal = monthWiseCount.agileActualNov+monthWiseCount.automationToolActualNov+monthWiseCount.prgLangActualNov+monthWiseCount.devOpsActualNov;

               monthWiseCount.DecPlanTotal = monthWiseCount.agilePlanDec+monthWiseCount.automationToolPlanDec+monthWiseCount.prgLangPlanDec+monthWiseCount.devOpsPlanDec;
               monthWiseCount.DecActualTotal = monthWiseCount.agileActualDec+monthWiseCount.automationToolActualDec+monthWiseCount.prgLangActualDec+monthWiseCount.devOpsActualDec;
               res.render('monthlycount', { title: 'monthlyPage', monthWiseCount});
              // res.send(monthWiseCount);
              });//devoopsActual
              });//End of devoopsPlanDate
            });//End of PrgLangActualDate
          });//End of PrgLangPlanDate
        });//End of AutomationToolActualDate
      });//End of AutomationToolPlanDate
    });//End of Agile Actual
  });//Agileplan fun end
};//end of fun

// Display certification count based on date range.
exports.certificate_count_monthwise2 = function(req, res,next) {
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

exports.planVsActual = function(req, res) {
var fromdate = req.query.startdate || '2020-01-01';
  var todate = req.query.enddate || '2021-01-01';
  console.log(fromdate);
  console.log(todate);
  var count = {};
  Employee.find({"AccountSpoke": "Anjali","AgilePlanDate":{$gte:new Date(fromdate), $lt:new Date(todate)}},function (err, AgilePlanDate) {
    if (err) return next(err);
    count.AgilePlanDateAnjali = AgilePlanDate.length;
    Employee.find({"AccountSpoke": "Abhijit","AgilePlanDate":{$gte:new Date(fromdate), $lt:new Date(todate)}},function (err, AgilePlanDate) {
      if (err) return next(err);
      count.AgilePlanDateAbhijit = AgilePlanDate.length;
      Employee.find({"AccountSpoke": "Ajay","AgilePlanDate":{$gte:new Date(fromdate), $lt:new Date(todate)}},function (err, AgilePlanDate) {
        if (err) return next(err);
        count.AgilePlanDateAjay = AgilePlanDate.length;
        Employee.find({"AccountSpoke": "Deepa","AgilePlanDate":{$gte:new Date(fromdate), $lt:new Date(todate)}},function (err, AgilePlanDate) {
          if (err) return next(err);
          count.AgilePlanDateDeepa = AgilePlanDate.length;
          Employee.find({"AccountSpoke": "Deepak Arora","AgilePlanDate":{$gte:new Date(fromdate), $lt:new Date(todate)}},function (err, AgilePlanDate) {
            if (err) return next(err);
            count.AgilePlanDateDeepakArora = AgilePlanDate.length;
            Employee.find({"AccountSpoke": "Deowrat","AgilePlanDate":{$gte:new Date(fromdate), $lt:new Date(todate)}},function (err, AgilePlanDate) {
              if (err) return next(err);
              count.AgilePlanDateDeowrat = AgilePlanDate.length;
              Employee.find({"AccountSpoke": "Jyoti","AgilePlanDate":{$gte:new Date(fromdate), $lt:new Date(todate)}},function (err, AgilePlanDate) {
                if (err) return next(err);
                count.AgilePlanDateJyoti = AgilePlanDate.length;
                Employee.find({"AccountSpoke": "Kaushal","AgilePlanDate":{$gte:new Date(fromdate), $lt:new Date(todate)}},function (err, AgilePlanDate) {
                  if (err) return next(err);
                  count.AgilePlanDateKaushal = AgilePlanDate.length;
                  Employee.find({"AccountSpoke": "Kirti","AgilePlanDate":{$gte:new Date(fromdate), $lt:new Date(todate)}},function (err, AgilePlanDate) {
                    if (err) return next(err);
                    count.AgilePlanDateKirti = AgilePlanDate.length;
                    Employee.find({"AccountSpoke": "Prabhakar","AgilePlanDate":{$gte:new Date(fromdate), $lt:new Date(todate)}},function (err, AgilePlanDate) {
                      if (err) return next(err);
                      count.AgilePlanDatePrabhakar = AgilePlanDate.length;
                      Employee.find({"AccountSpoke": "Ritesh Zade","AgilePlanDate":{$gte:new Date(fromdate), $lt:new Date(todate)}},function (err, AgilePlanDate) {
                        if (err) return next(err);
                        count.AgilePlanDateRiteshZade = AgilePlanDate.length;
                        Employee.find({"AccountSpoke": "Vijay Varma","AgilePlanDate":{$gte:new Date(fromdate), $lt:new Date(todate)}},function (err, AgilePlanDate) {
                          if (err) return next(err);
                          count.AgilePlanDateVijayVarma = AgilePlanDate.length;
                          //over Agile plan
        //
        Employee.find({"AccountSpoke": "Anjali","AgileActualDate":{$gte:new Date(fromdate), $lt:new Date(todate)}} ,function (err, AgileActualDate) {
        if (err) return next(err);
        count.AgileActualAnjali = AgileActualDate.length;

        Employee.find({"AccountSpoke": "Abhijit","AgileActualDate":{$gte:new Date(fromdate), $lt:new Date(todate)}} ,function (err, AgileActualDate) {
          if (err) return next(err);
          count.AgileActualAbhijit = AgileActualDate.length;
          Employee.find({"AccountSpoke": "Ajay","AgileActualDate":{$gte:new Date(fromdate), $lt:new Date(todate)}} ,function (err, AgileActualDate) {
            if (err) return next(err);
            count.AgileActualAjay = AgileActualDate.length;

            Employee.find({"AccountSpoke": "Deepa","AgileActualDate":{$gte:new Date(fromdate), $lt:new Date(todate)}} ,function (err, AgileActualDate) {
              if (err) return next(err);
              count.AgileActualDeepa = AgileActualDate.length;

              Employee.find({"AccountSpoke": "Deepak Arora","AgileActualDate":{$gte:new Date(fromdate), $lt:new Date(todate)}} ,function (err, AgileActualDate) {
                if (err) return next(err);
                count.AgileActualDeepakArora = AgileActualDate.length;

                Employee.find({"AccountSpoke": "Deowrat","AgileActualDate":{$gte:new Date(fromdate), $lt:new Date(todate)}} ,function (err, AgileActualDate) {
                  if (err) return next(err);
                  count.AgileActualDeowrat = AgileActualDate.length;

                  Employee.find({"AccountSpoke": "Jyoti","AgileActualDate":{$gte:new Date(fromdate), $lt:new Date(todate)}} ,function (err, AgileActualDate) {
                    if (err) return next(err);
                    count.AgileActualJyoti = AgileActualDate.length;

                    Employee.find({"AccountSpoke": "Kaushal","AgileActualDate":{$gte:new Date(fromdate), $lt:new Date(todate)}} ,function (err, AgileActualDate) {
                      if (err) return next(err);
                      count.AgileActualKaushal = AgileActualDate.length;

                      Employee.find({"AccountSpoke": "Kirti","AgileActualDate":{$gte:new Date(fromdate), $lt:new Date(todate)}} ,function (err, AgileActualDate) {
                        if (err) return next(err);
                        count.AgileActualKirti = AgileActualDate.length;

                        Employee.find({"AccountSpoke": "Prabhakar","AgileActualDate":{$gte:new Date(fromdate), $lt:new Date(todate)}} ,function (err, AgileActualDate) {
                          if (err) return next(err);
                          count.AgileActualPrabhakar = AgileActualDate.length;

                          Employee.find({"AccountSpoke": "Ritesh Zade","AgileActualDate":{$gte:new Date(fromdate), $lt:new Date(todate)}} ,function (err, AgileActualDate) {
                            if (err) return next(err);
                            count.AgileActualRiteshZade = AgileActualDate.length;

                            Employee.find({"AccountSpoke": "Vijay Varma","AgileActualDate":{$gte:new Date(fromdate), $lt:new Date(todate)}} ,function (err, AgileActualDate) {
                              if (err) return next(err);
                              count.AgileActualVijayVarma = AgileActualDate.length;
        //over agile actual
               Employee.find({"AccountSpoke": "Anjali","AgileCompletionDate":{$gte:new Date(fromdate), $lt:new Date(todate)}} ,function (err, AgileCompletionDate) {
                if (err) return next(err);
                count.AgileCompletionAnjali = AgileCompletionDate.length;

                    Employee.find({"AccountSpoke": "Anjali","AutomationToolPlanDate":{$gte:new Date(fromdate), $lt:new Date(todate)}} ,function (err, AutomationToolPlanDate) {
                      if (err) return next(err);
                      count.AutomationToolPlanAnjali = AutomationToolPlanDate.length;

                      Employee.find({"AccountSpoke": "Abhijit","AutomationToolPlanDate":{$gte:new Date(fromdate), $lt:new Date(todate)}} ,function (err, AutomationToolPlanDate) {
                        if (err) return next(err);
                        count.AutomationToolPlanAbhijit = AutomationToolPlanDate.length;
                        Employee.find({"AccountSpoke": "Ajay","AutomationToolPlanDate":{$gte:new Date(fromdate), $lt:new Date(todate)}} ,function (err, AutomationToolPlanDate) {
                          if (err) return next(err);
                          count.AutomationToolPlanAjay = AutomationToolPlanDate.length;

                          Employee.find({"AccountSpoke": "Deepa","AutomationToolPlanDate":{$gte:new Date(fromdate), $lt:new Date(todate)}} ,function (err, AutomationToolPlanDate) {
                            if (err) return next(err);
                            count.AutomationToolPlanDeepa = AutomationToolPlanDate.length;

                            Employee.find({"AccountSpoke": "Deepak Arora","AutomationToolPlanDate":{$gte:new Date(fromdate), $lt:new Date(todate)}} ,function (err, AutomationToolPlanDate) {
                              if (err) return next(err);
                              count.AutomationToolPlanDeepakArora = AutomationToolPlanDate.length;

                              Employee.find({"AccountSpoke": "Deowrat","AutomationToolPlanDate":{$gte:new Date(fromdate), $lt:new Date(todate)}} ,function (err, AutomationToolPlanDate) {
                                if (err) return next(err);
                                count.AutomationToolPlanDeowrat = AutomationToolPlanDate.length;

                                Employee.find({"AccountSpoke": "Jyoti","AutomationToolPlanDate":{$gte:new Date(fromdate), $lt:new Date(todate)}} ,function (err, AutomationToolPlanDate) {
                                  if (err) return next(err);
                                  count.AutomationToolPlanJyoti = AutomationToolPlanDate.length;

                                  Employee.find({"AccountSpoke": "Kaushal","AutomationToolPlanDate":{$gte:new Date(fromdate), $lt:new Date(todate)}} ,function (err, AutomationToolPlanDate) {
                                    if (err) return next(err);
                                    count.AutomationToolPlanKaushal = AutomationToolPlanDate.length;

                                    Employee.find({"AccountSpoke": "Kirti","AutomationToolPlanDate":{$gte:new Date(fromdate), $lt:new Date(todate)}} ,function (err, AutomationToolPlanDate) {
                                      if (err) return next(err);
                                      count.AutomationToolPlanKirti = AutomationToolPlanDate.length;

                                      Employee.find({"AccountSpoke": "Prabhakar","AutomationToolPlanDate":{$gte:new Date(fromdate), $lt:new Date(todate)}} ,function (err, AutomationToolPlanDate) {
                                        if (err) return next(err);
                                        count.AutomationToolPlanPrabhakar = AutomationToolPlanDate.length;

                                        Employee.find({"AccountSpoke": "Ritesh Zade","AutomationToolPlanDate":{$gte:new Date(fromdate), $lt:new Date(todate)}} ,function (err, AutomationToolPlanDate) {
                                          if (err) return next(err);
                                          count.AutomationToolPlanRiteshZade = AutomationToolPlanDate.length;

                                          Employee.find({"AccountSpoke": "Vijay Varma","AutomationToolPlanDate":{$gte:new Date(fromdate), $lt:new Date(todate)}} ,function (err, AutomationToolPlanDate) {
                                            if (err) return next(err);
                                            count.AutomationToolPlanVijayVarma = AutomationToolPlanDate.length;
 //eod ==== automation plan
                          Employee.find({"AccountSpoke": "Anjali","AutomationToolActualDate":{$gte:new Date(fromdate), $lt:new Date(todate)}} ,function (err, AutomationToolActualDate) {
                          if (err) return next(err);
                          count.AutomationToolActualAnjali = AutomationToolActualDate.length;

                          Employee.find({"AccountSpoke": "Abhijit","AutomationToolActualDate":{$gte:new Date(fromdate), $lt:new Date(todate)}} ,function (err, AutomationToolActualDate) {
                            if (err) return next(err);
                            count.AutomationToolActualAbhijit = AutomationToolActualDate.length;

                            
                            Employee.find({"AccountSpoke": "Ajay","AutomationToolActualDate":{$gte:new Date(fromdate), $lt:new Date(todate)}} ,function (err, AutomationToolActualDate) {
                              if (err) return next(err);
                              count.AutomationToolActualAjay = AutomationToolActualDate.length;

                              
                              Employee.find({"AccountSpoke": "Deepa","AutomationToolActualDate":{$gte:new Date(fromdate), $lt:new Date(todate)}} ,function (err, AutomationToolActualDate) {
                                if (err) return next(err);
                                count.AutomationToolActualDeepa = AutomationToolActualDate.length;

                                
                                Employee.find({"AccountSpoke": "Deepak Arora","AutomationToolActualDate":{$gte:new Date(fromdate), $lt:new Date(todate)}} ,function (err, AutomationToolActualDate) {
                                  if (err) return next(err);
                                  count.AutomationToolActualDeepakArora = AutomationToolActualDate.length;
        

                                  Employee.find({"AccountSpoke": "Deowrat","AutomationToolActualDate":{$gte:new Date(fromdate), $lt:new Date(todate)}} ,function (err, AutomationToolActualDate) {
                                    if (err) return next(err);
                                    count.AutomationToolActualDeowrat = AutomationToolActualDate.length;

                                    
                                    Employee.find({"AccountSpoke": "Jyoti","AutomationToolActualDate":{$gte:new Date(fromdate), $lt:new Date(todate)}} ,function (err, AutomationToolActualDate) {
                                      if (err) return next(err);
                                      count.AutomationToolActualJyoti = AutomationToolActualDate.length;

                                      
                                      Employee.find({"AccountSpoke": "Kaushal","AutomationToolActualDate":{$gte:new Date(fromdate), $lt:new Date(todate)}} ,function (err, AutomationToolActualDate) {
                                        if (err) return next(err);
                                        count.AutomationToolActualKaushal = AutomationToolActualDate.length;

                                        
                                        Employee.find({"AccountSpoke": "Kirti","AutomationToolActualDate":{$gte:new Date(fromdate), $lt:new Date(todate)}} ,function (err, AutomationToolActualDate) {
                                          if (err) return next(err);
                                          count.AutomationToolActualKirti = AutomationToolActualDate.length;

                                          Employee.find({"AccountSpoke": "Prabhakar","AutomationToolActualDate":{$gte:new Date(fromdate), $lt:new Date(todate)}} ,function (err, AutomationToolActualDate) {
                                            if (err) return next(err);
                                            count.AutomationToolActualPrabhakar = AutomationToolActualDate.length;

                                            
                                            Employee.find({"AccountSpoke": "Ritesh Zade","AutomationToolActualDate":{$gte:new Date(fromdate), $lt:new Date(todate)}} ,function (err, AutomationToolActualDate) {
                                              if (err) return next(err);
                                              count.AutomationToolActualRiteshZade = AutomationToolActualDate.length;
                                              Employee.find({"AccountSpoke": "Vijay Varma","AutomationToolActualDate":{$gte:new Date(fromdate), $lt:new Date(todate)}} ,function (err, AutomationToolActualDate) {
                                                if (err) return next(err);
                                                count.AutomationToolActualVijayVarma = AutomationToolActualDate.length;
 // //eod ==== automation Actual
                              Employee.find({"AccountSpoke": "Anjali","AutomationToolCompletionDate":{$gte:new Date(fromdate), $lt:new Date(todate)}} ,function (err, AutomationToolCompletionDate) {
                                if (err) return next(err);
                                count.AutomationToolCompletionDate = AutomationToolCompletionDate.length;
//=========
                                  Employee.find({"AccountSpoke": "Anjali","PrgLangPlanDate":{$gte:new Date(fromdate), $lt:new Date(todate)}} ,function (err, PrgLangPlanDate) {
                                      if (err) return next(err);
                                      count.PrgLangPlanAnjali = PrgLangPlanDate.length;
            
                                      Employee.find({"AccountSpoke": "Abhijit","PrgLangPlanDate":{$gte:new Date(fromdate), $lt:new Date(todate)}} ,function (err, PrgLangPlanDate) {
                                        if (err) return next(err);
                                        count.PrgLangPlanAbhijit = PrgLangPlanDate.length;
            
                                        
                                        Employee.find({"AccountSpoke": "Ajay","PrgLangPlanDate":{$gte:new Date(fromdate), $lt:new Date(todate)}} ,function (err, PrgLangPlanDate) {
                                          if (err) return next(err);
                                          count.PrgLangPlanAjay = PrgLangPlanDate.length;
            
                                          
                                          Employee.find({"AccountSpoke": "Deepa","PrgLangPlanDate":{$gte:new Date(fromdate), $lt:new Date(todate)}} ,function (err, PrgLangPlanDate) {
                                            if (err) return next(err);
                                            count.PrgLangPlanDeepa = PrgLangPlanDate.length;
            
                                            
                                            Employee.find({"AccountSpoke": "Deepak Arora","PrgLangPlanDate":{$gte:new Date(fromdate), $lt:new Date(todate)}} ,function (err, PrgLangPlanDate) {
                                              if (err) return next(err);
                                              count.PrgLangPlanDeepakArora = PrgLangPlanDate.length;
                    
            
                                              Employee.find({"AccountSpoke": "Deowrat","PrgLangPlanDate":{$gte:new Date(fromdate), $lt:new Date(todate)}} ,function (err, PrgLangPlanDate) {
                                                if (err) return next(err);
                                                count.PrgLangPlanDeowrat = PrgLangPlanDate.length;
            
                                                
                                                Employee.find({"AccountSpoke": "Jyoti","PrgLangPlanDate":{$gte:new Date(fromdate), $lt:new Date(todate)}} ,function (err, PrgLangPlanDate) {
                                                  if (err) return next(err);
                                                  count.PrgLangPlanJyoti = PrgLangPlanDate.length;
            
                                                  
                                                  Employee.find({"AccountSpoke": "Kaushal","PrgLangPlanDate":{$gte:new Date(fromdate), $lt:new Date(todate)}} ,function (err, PrgLangPlanDate) {
                                                    if (err) return next(err);
                                                    count.PrgLangPlanKaushal = PrgLangPlanDate.length;
            
                                                    
                                                    Employee.find({"AccountSpoke": "Kirti","PrgLangPlanDate":{$gte:new Date(fromdate), $lt:new Date(todate)}} ,function (err, PrgLangPlanDate) {
                                                      if (err) return next(err);
                                                      count.PrgLangPlanKirti = PrgLangPlanDate.length;
            
                                                      Employee.find({"AccountSpoke": "Prabhakar","PrgLangPlanDate":{$gte:new Date(fromdate), $lt:new Date(todate)}} ,function (err, PrgLangPlanDate) {
                                                        if (err) return next(err);
                                                        count.PrgLangPlanPrabhakar = PrgLangPlanDate.length;
            
                                                        Employee.find({"AccountSpoke": "Ritesh Zade","PrgLangPlanDate":{$gte:new Date(fromdate), $lt:new Date(todate)}} ,function (err, PrgLangPlanDate) {
                                                          if (err) return next(err);
                                                          count.PrgLangPlanRiteshZade = PrgLangPlanDate.length;
                                                          Employee.find({"AccountSpoke": "Vijay Varma","PrgLangPlanDate":{$gte:new Date(fromdate), $lt:new Date(todate)}} ,function (err, PrgLangPlanDate) {
                                                            if (err) return next(err);
                                                            count.PrgLangPlanVijayVarma = PrgLangPlanDate.length;
             // //eod ==== progrm Plan 

                                        Employee.find({"AccountSpoke": "Anjali","PrgLangActualDate":{$gte:new Date(fromdate), $lt:new Date(todate)}} ,function (err, PrgLangActualDate) {
                                          if (err) return next(err);
                                          count.PrgLangActualAnjali = PrgLangActualDate.length;
                
                                          Employee.find({"AccountSpoke": "Abhijit","PrgLangActualDate":{$gte:new Date(fromdate), $lt:new Date(todate)}} ,function (err, PrgLangActualDate) {
                                            if (err) return next(err);
                                            count.PrgLangActualAbhijit = PrgLangActualDate.length;
                
                                            
                                            Employee.find({"AccountSpoke": "Ajay","PrgLangActualDate":{$gte:new Date(fromdate), $lt:new Date(todate)}} ,function (err, PrgLangActualDate) {
                                              if (err) return next(err);
                                              count.PrgLangActualAjay = PrgLangActualDate.length;
                
                                              
                                              Employee.find({"AccountSpoke": "Deepa","PrgLangActualDate":{$gte:new Date(fromdate), $lt:new Date(todate)}} ,function (err, PrgLangActualDate) {
                                                if (err) return next(err);
                                                count.PrgLangActualDeepa = PrgLangActualDate.length;
                
                                                
                                                Employee.find({"AccountSpoke": "Deepak Arora","PrgLangActualDate":{$gte:new Date(fromdate), $lt:new Date(todate)}} ,function (err, PrgLangActualDate) {
                                                  if (err) return next(err);
                                                  count.PrgLangActualDeepakArora = PrgLangActualDate.length;
                        
                
                                                  Employee.find({"AccountSpoke": "Deowrat","PrgLangActualDate":{$gte:new Date(fromdate), $lt:new Date(todate)}} ,function (err, PrgLangActualDate) {
                                                    if (err) return next(err);
                                                    count.PrgLangActualDeowrat = PrgLangActualDate.length;
                
                                                    
                                                    Employee.find({"AccountSpoke": "Jyoti","PrgLangActualDate":{$gte:new Date(fromdate), $lt:new Date(todate)}} ,function (err, PrgLangActualDate) {
                                                      if (err) return next(err);
                                                      count.PrgLangActualJyoti = PrgLangActualDate.length;
                
                                                      
                                                      Employee.find({"AccountSpoke": "Kaushal","PrgLangActualDate":{$gte:new Date(fromdate), $lt:new Date(todate)}} ,function (err, PrgLangActualDate) {
                                                        if (err) return next(err);
                                                        count.PrgLangActualKaushal = PrgLangActualDate.length;
                
                                                        
                                                        Employee.find({"AccountSpoke": "Kirti","PrgLangActualDate":{$gte:new Date(fromdate), $lt:new Date(todate)}} ,function (err, PrgLangActualDate) {
                                                          if (err) return next(err);
                                                          count.PrgLangActualKirti = PrgLangActualDate.length;
                
                                                          Employee.find({"AccountSpoke": "Prabhakar","PrgLangActualDate":{$gte:new Date(fromdate), $lt:new Date(todate)}} ,function (err, PrgLangActualDate) {
                                                            if (err) return next(err);
                                                            count.PrgLangActualPrabhakar = PrgLangActualDate.length;
                
                                                            
                                                            Employee.find({"AccountSpoke": "Ritesh Zade","PrgLangActualDate":{$gte:new Date(fromdate), $lt:new Date(todate)}} ,function (err, PrgLangActualDate) {
                                                              if (err) return next(err);
                                                              count.PrgLangActualRiteshZade = PrgLangActualDate.length;
                                                              Employee.find({"AccountSpoke": "Vijay Varma","PrgLangActualDate":{$gte:new Date(fromdate), $lt:new Date(todate)}} ,function (err, PrgLangActualDate) {
                                                                if (err) return next(err);
                                                                count.PrgLangActualVijayVarma = PrgLangActualDate.length;
                 // //eod ==== prg Actual

                                            Employee.find({"AccountSpoke": "Anjali","PrgLangCompletionDate":{$gte:new Date(fromdate), $lt:new Date(todate)}} ,function (err, PrgLangCompletionDate) {
                                            if (err) return next(err);
                                            count.PrgLangCompletionDate = PrgLangCompletionDate.length;
//============
                                                Employee.find({"AccountSpoke": "Anjali","DevOpsPlanDate":{$gte:new Date(fromdate), $lt:new Date(todate)}} ,function (err, DevOpsPlanDate) {
                                                  if (err) return next(err);
                                                  count.DevOpsPlanAnjali = DevOpsPlanDate.length;
                        
                                                  Employee.find({"AccountSpoke": "Abhijit","DevOpsPlanDate":{$gte:new Date(fromdate), $lt:new Date(todate)}} ,function (err, DevOpsPlanDate) {
                                                    if (err) return next(err);
                                                    count.DevOpsPlanAbhijit = DevOpsPlanDate.length;
                        
                                                    
                                                    Employee.find({"AccountSpoke": "Ajay","DevOpsPlanDate":{$gte:new Date(fromdate), $lt:new Date(todate)}} ,function (err, DevOpsPlanDate) {
                                                      if (err) return next(err);
                                                      count.DevOpsPlanAjay = DevOpsPlanDate.length;
                        
                                                      
                                                      Employee.find({"AccountSpoke": "Deepa","DevOpsPlanDate":{$gte:new Date(fromdate), $lt:new Date(todate)}} ,function (err, DevOpsPlanDate) {
                                                        if (err) return next(err);
                                                        count.DevOpsPlanDeepa = DevOpsPlanDate.length;
                        
                                                        
                                                        Employee.find({"AccountSpoke": "Deepak Arora","DevOpsPlanDate":{$gte:new Date(fromdate), $lt:new Date(todate)}} ,function (err, DevOpsPlanDate) {
                                                          if (err) return next(err);
                                                          count.DevOpsPlanDeepakArora = DevOpsPlanDate.length;
                                
                        
                                                          Employee.find({"AccountSpoke": "Deowrat","DevOpsPlanDate":{$gte:new Date(fromdate), $lt:new Date(todate)}} ,function (err, DevOpsPlanDate) {
                                                            if (err) return next(err);
                                                            count.DevOpsPlanDeowrat = DevOpsPlanDate.length;
                        
                                                            
                                                            Employee.find({"AccountSpoke": "Jyoti","DevOpsPlanDate":{$gte:new Date(fromdate), $lt:new Date(todate)}} ,function (err, DevOpsPlanDate) {
                                                              if (err) return next(err);
                                                              count.DevOpsPlanJyoti = DevOpsPlanDate.length;
                        
                                                              
                                                              Employee.find({"AccountSpoke": "Kaushal","DevOpsPlanDate":{$gte:new Date(fromdate), $lt:new Date(todate)}} ,function (err, DevOpsPlanDate) {
                                                                if (err) return next(err);
                                                                count.DevOpsPlanKaushal = DevOpsPlanDate.length;
                        
                                                                
                                                                Employee.find({"AccountSpoke": "Kirti","DevOpsPlanDate":{$gte:new Date(fromdate), $lt:new Date(todate)}} ,function (err, DevOpsPlanDate) {
                                                                  if (err) return next(err);
                                                                  count.DevOpsPlanKirti = DevOpsPlanDate.length;
                        
                                                                  Employee.find({"AccountSpoke": "Prabhakar","DevOpsPlanDate":{$gte:new Date(fromdate), $lt:new Date(todate)}} ,function (err, DevOpsPlanDate) {
                                                                    if (err) return next(err);
                                                                    count.DevOpsPlanPrabhakar = DevOpsPlanDate.length;
                        
                                                                    
                                                                    Employee.find({"AccountSpoke": "Ritesh Zade","DevOpsPlanDate":{$gte:new Date(fromdate), $lt:new Date(todate)}} ,function (err, DevOpsPlanDate) {
                                                                      if (err) return next(err);
                                                                      count.DevOpsPlanRiteshZade = DevOpsPlanDate.length;
                                                                      Employee.find({"AccountSpoke": "Vijay Varma","DevOpsPlanDate":{$gte:new Date(fromdate), $lt:new Date(todate)}} ,function (err, DevOpsPlanDate) {
                                                                        if (err) return next(err);
                                                                        count.DevOpsPlanVijayVarma = DevOpsPlanDate.length;
                         // //eod ==== Devoops Plan
                                                    
                                                      Employee.find({"AccountSpoke": "Anjali","DevOpsActualPlanDate":{$gte:new Date(fromdate), $lt:new Date(todate)}} ,function (err, DevOpsActualPlanDate) {
                                                        if (err) return next(err);
                                                        count.DevOpsActualAnjali = DevOpsActualPlanDate.length;
                              
                                                        Employee.find({"AccountSpoke": "Abhijit","DevOpsActualPlanDate":{$gte:new Date(fromdate), $lt:new Date(todate)}} ,function (err, DevOpsActualPlanDate) {
                                                          if (err) return next(err);
                                                          count.DevOpsActualAbhijit = DevOpsActualPlanDate.length;
                              
                                                          
                                                          Employee.find({"AccountSpoke": "Ajay","DevOpsActualPlanDate":{$gte:new Date(fromdate), $lt:new Date(todate)}} ,function (err, DevOpsActualPlanDate) {
                                                            if (err) return next(err);
                                                            count.DevOpsActualAjay = DevOpsActualPlanDate.length;
                              
                                                            
                                                            Employee.find({"AccountSpoke": "Deepa","DevOpsActualPlanDate":{$gte:new Date(fromdate), $lt:new Date(todate)}} ,function (err, DevOpsActualPlanDate) {
                                                              if (err) return next(err);
                                                              count.DevOpsActualDeepa = DevOpsActualPlanDate.length;
                              
                                                              
                                                              Employee.find({"AccountSpoke": "Deepak Arora","DevOpsActualPlanDate":{$gte:new Date(fromdate), $lt:new Date(todate)}} ,function (err, DevOpsActualPlanDate) {
                                                                if (err) return next(err);
                                                                count.DevOpsActualDeepakArora = DevOpsActualPlanDate.length;
                                      
                              
                                                                Employee.find({"AccountSpoke": "Deowrat","DevOpsActualPlanDate":{$gte:new Date(fromdate), $lt:new Date(todate)}} ,function (err, DevOpsActualPlanDate) {
                                                                  if (err) return next(err);
                                                                  count.DevOpsActualDeowrat = DevOpsActualPlanDate.length;
                              
                                                                  
                                                                  Employee.find({"AccountSpoke": "Jyoti","DevOpsActualPlanDate":{$gte:new Date(fromdate), $lt:new Date(todate)}} ,function (err, DevOpsActualPlanDate) {
                                                                    if (err) return next(err);
                                                                    count.DevOpsActualJyoti = DevOpsActualPlanDate.length;
                              
                                                                    
                                                                    Employee.find({"AccountSpoke": "Kaushal","DevOpsActualPlanDate":{$gte:new Date(fromdate), $lt:new Date(todate)}} ,function (err, DevOpsActualPlanDate) {
                                                                      if (err) return next(err);
                                                                      count.DevOpsActualKaushal = DevOpsActualPlanDate.length;
                              
                                                                      
                                                                      Employee.find({"AccountSpoke": "Kirti","DevOpsActualPlanDate":{$gte:new Date(fromdate), $lt:new Date(todate)}} ,function (err, DevOpsActualPlanDate) {
                                                                        if (err) return next(err);
                                                                        count.DevOpsActualKirti = DevOpsActualPlanDate.length;
                              
                                                                        Employee.find({"AccountSpoke": "Prabhakar","DevOpsActualPlanDate":{$gte:new Date(fromdate), $lt:new Date(todate)}} ,function (err, DevOpsActualPlanDate) {
                                                                          if (err) return next(err);
                                                                          count.DevOpsActualPrabhakar = DevOpsActualPlanDate.length;
                              
                                                                          
                                                                          Employee.find({"AccountSpoke": "Ritesh Zade","DevOpsActualPlanDate":{$gte:new Date(fromdate), $lt:new Date(todate)}} ,function (err, DevOpsActualPlanDate) {
                                                                            if (err) return next(err);
                                                                            count.DevOpsActualRiteshZade = DevOpsActualPlanDate.length;
                                                                            Employee.find({"AccountSpoke": "Vijay Varma","DevOpsActualPlanDate":{$gte:new Date(fromdate), $lt:new Date(todate)}} ,function (err, DevOpsActualPlanDate) {
                                                                              if (err) return next(err);
                                                                              count.DevOpsActualVijayVarma = DevOpsActualPlanDate.length;
                               // //eod ==== automation Actual
                                                      
                                                        Employee.find({"AccountSpoke": "Anjali","DevOpsCompletionDate":{$gte:new Date(fromdate), $lt:new Date(todate)}} ,function (err, DevOpsCompletionDate) {
                                                          if (err) return next(err);
                                                          count.DevOpsCompletionDate = DevOpsCompletionDate.length;
                                                          console.log('hers ois 9999999999');
                                                         // Object.keys(count).length;
                                                          console.log(Object.keys(count).length );
                                                          //console.log(count.AutomationToolActualDate);
                                                          var tes= {};
                                                          for (i = 0; i < 10; i++) {
                                                            tes[i] = count[i];
                                                          console.log(tes[i]);
                                                          }
                                                          //res.send(count);
                                                          res.render('planvsActual', { title: 'Page',count});
                                                        });                                                                                                                                                                                                                                                                                                                                          
});});});});});});});});});});
});});});});});});});});});});});});});});});});});});});});});});});
}); });});});});});});});});});});});});});});});});});});});});});});});});});});});});});});});});
}); });});});});});});});});});});});});});});});});});});});});});});});});});});});});});});});});
};//Eod of function

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

exports.planVsActuall =  function(req, res) {
  res.render('planvsActual', { title: 'PlanActual'});
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





