const express = require('express')
const router = express.Router()
const  {createCollege,collegeInterns} = require('../controllers/collegeController')
const internController = require('../controllers/internController')
const validation = require('../validators/validator')
 
router.post('/functionup/colleges',validation.collegeValidation, createCollege)    //1. 
router.post('/functionup/interns',validation.internValidation, internController.createIntern)    //2.
router.get('/functionup/collegeDetails', collegeInterns )    //3. GET API

 


module.exports = router;