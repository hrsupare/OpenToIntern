const express = require('express')
const router = express.Router()
const collegeController = require('../controllers/collegeController')
const internController = require('../controllers/internController')
const validation = require('../validators/validator')

router.post('/functionup/colleges',validation.collegeValidation,collegeController.createCollege)
router.post('/functionup/interns', internController.createIntern)

module.exports = router;