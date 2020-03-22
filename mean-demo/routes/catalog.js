var express = require('express');
var router = express.Router();

// Require controller modules.
var employee_controller = require('../controllers/EmployeeController');

// GET request for one Book.
router.get('/about', employee_controller.employee_detail);

// GET request for list of all Book items.
router.get('/', employee_controller.employee_list);

// Post request for creating items.
router.post('/create', employee_controller.add_employee);

// delete request for employee items.
router.delete('/:_id',  employee_controller.delete_employee);


module.exports = router;