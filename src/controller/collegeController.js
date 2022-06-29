const collegeModel = require('../models/collegeModel')


const isValidBody = function (y) {
    return Object.keys(y).length > 0
}
const isValid = function (x) {
    if (typeof x === 'undefined' || x === null) return false
    if (typeof x === 'string' && x.trim().length === 0) return false
    return true
}
let strRegex =/^\w[A-Za-z\s]{1,}[\.]{0,1}[A-Za-z\s]{0,}$/;
// var urlRegEx = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpeg|png)/
const college = async function (req, res) {
    try {
        let data = req.body
       
        let collegename = req.body.name

        if (!isValidBody(data)) return res.status(400).send({ status: false, msg: "data not found" })

        if (!data.name || !isValid(data.name)|| !data.name.match(/^[a-zA-Z]+$/)) return res.status(400).send({ status: false, msg: "College name is not found in valid Format" })
        let repeatedName = await collegeModel.findOne({ name: collegename })
        if (repeatedName) return res.status(400).send({ status: false, msg: `${collegename} is Already Registered ` })

        if (!data.fullName || !isValid(data.fullName) || !data.fullName.match(/^\w[A-Za-z\s]{1,}[\.]{0,1}[A-Za-z\s]{0,}$/) ) return res.status(400).send({ status: false, msg: "College fullName is not found in valid Format" })

        if (!data.logoLink ) return res.status(400).send({ status: false, msg: "link not found" })

 
        let createCollege = await collegeModel.create(data)
        res.status(201).send({ status: true, data: createCollege })
    } catch (err) {
        res.status(500).send({ status: false, msg: err.message })
    }
}

module.exports.college = college