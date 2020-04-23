var mongoose = require('mongoose');

var readcsv_db = new mongoose.Schema({
EmpNo : String, 
EmpName : String, 
EmpRoleCode : String,
 ActDesc : String, 
 EmpDU : String,
 EmpBU : String,
 EmpPU : String,
 ReportingPU : String,
 EmpSubUnit : String,
 EmpUnit : String,
 EmpCompany : String, 
 STPSEZ : String,
 CurrentCity : String,
 CurrentLocation : String,
 BaseCity : String, 
 BaseLocation : String,
 EmpBandCode : String,
 EmpType : String,
 ProjectCode : String,
 MasterProjectCode : String, 
 ProjectDM : String, 
 ProjectDMMailID : String,
 ProjectType : String, 
 ContractType : String, 
 ProjectName : String,
 ProjectFromDate : String, 
 ProjectToDate : String, 
 ServiceCode : String, 
 TechCode : String, 
 MarketingBranchCode : String, 
 ProjectDU : String,
 ProjectDUHead : String, 
 ProjectBU : String,
 ProjectPU : String, 
 ProjectSubUnit : String, 
 ProjectUnit : String, 
 ProjectCompany : String,
 ProjectSourceCompany : String,
 CustomerCode : String,
 MasterCustomer : String, 
 CustomerSubUnit :String,
 AllocFromDate : String,
 AllocToDate : String, 
 Percent : String, 
 OnsiteOffshore : String, 
 Duration : String,
 Remarks : String, 
 ReasonsDesc : String,
 PartTimeEmployee : String,
 AllocatedCountry : String,
 AllocatedCity : String,
 ReportingTo : String, 
 CurrentlyOnsiteOffshore : String, 
 CurrentCountry : String,
 GroupMasterProjectCode : String,
 EmployeeHorizontalCompetency : String,
 EmployeeVerticalCompetency : String ,
 LatestRate : String, 
 MultipleRatesAvailable : String,
});

module.exports = mongoose.model('categories', readcsv_db,'category');