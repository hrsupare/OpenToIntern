const express = require('express')
const router = express.Router()
const  {createCollege,collegeInterns} = require('../controllers/collegeController.js');
const internController = require('../controllers/internController.js');
const middleware = require('../middlewares/commonMiddlewares.js');
 


router.post('/functionup/colleges',middleware.collegeValidation, createCollege)    //1.create college 
router.post('/functionup/interns',middleware.internValidation, internController.createIntern)    //2.create interns
router.get('/functionup/collegeDetails', collegeInterns )    //3. GET college details

 

module.exports = router;