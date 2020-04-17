var express = require('express');
var router = express.Router();
//API Routes
// Require controller modules.
var employee_controller2 = require('../controllers/Readcsvcontroller');

//FrontEnd routes
//router.get('/', employee_controller2.uploadPage);
router.get('/', employee_controller2.showuploadeddata);
router.post('/data', employee_controller2.datatodb);
router.get('/showuploadeddata', employee_controller2.showuploadeddata);

   
module.exports = router;