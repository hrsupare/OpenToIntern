const express = require('express')
const router = express.Router()
const collegeController = require('../controllers/collegeController')
const internController = require('../controllers/internController')
const validation = require('../validators/validator')
 
router.post('/functionup/colleges',validation.collegeValidation,collegeController.createCollege)    //1. 
router.post('/functionup/interns', internController.createIntern)    //2.
router.get('/functionup/collegeDetails', collegeController.collegeInterns )    //3. GET API

 


module.exports = router;