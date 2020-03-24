var express = require('express');
var router = express.Router();

// Require controller modules.
var employee_controller = require('../controllers/EmployeeController');

// GET request for one Book.
router.get('/about', employee_controller.employee_detail);

// GET request for list of employee details.
router.get('/', employee_controller.employee_list);

// Post request for creating employee.
router.post('/create', employee_controller.add_employee);

// delete request for employee.
router.delete('/delete/:_id',  employee_controller.delete_employee);

// Update request for employee items.
router.put('/update/:_id', employee_controller.update_employee);

// GET request based on month.
router.get('/month', employee_controller.certificate_count_monthwise);

// GET request for one employee on id.
router.get('/single/:id', employee_controller.singleemployee_detail);



module.exports = router;