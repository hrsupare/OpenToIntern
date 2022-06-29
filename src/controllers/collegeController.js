const collegeModel = require('../models/collegeModel')

const createCollege = async function (req, res) {
    try {
        let data = req.body
        let createCollege = await collegeModel.create(data)
        return res.status(201).send({ status: true, data: createCollege })
    } catch (err) {
        res.status(500).send({ status: false, msg: err.message })
    }
}

module.exports.createCollege = createCollege