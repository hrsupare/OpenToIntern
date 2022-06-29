const express = require('express');
const router = express.Router();

const controller = require('../controllers/controller.js')
// const validator = require('../validator/validator.js')

router.post('/functionup/colleges', controller.createCollege )    //3. GET API
router.post('/functionup/interns', controller.createIntern)    //3. GET API
router.get('/functionup/collegeDetails', controller.collegeInterns )    //3. GET API

 


module.exports = router;