var express = require('express');
var router = express.Router();
//API Routes
// Require controller modules.
var employee_controller = require('../controllers/EmployeeController');

// GET request for one Book.
router.get('/about', employee_controller.employee_detail);
// list of employee details.
router.get('/list', employee_controller.employee_list);
// Add creating employee.
router.post('/create', employee_controller.add_employee);
// delete request for employee.
//router.delete('/delete/:_id',  employee_controller.delete_employee);
router.get('/delete',  employee_controller.delete_employee);
// Update request for employee items.
router.get('/update', employee_controller.update_employee);
// month wise.
router.get('/month', employee_controller.certificate_count_monthwise);
// GET request for one employee on id.
router.get('/single/:id', employee_controller.singleemployee_detail);

//FrontEnd routes
router.get('/', employee_controller.indexpage);
router.get('/monthlypage', employee_controller.certificate_count_monthwise);
router.get('/addaccount', employee_controller.addaccountpage);
router.get('/singleUpdate', employee_controller.singleRecordUpdate_detail);
router.get('/tes', employee_controller.test);
   
module.exports = router;