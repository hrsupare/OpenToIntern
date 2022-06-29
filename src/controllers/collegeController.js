const collegeModel = require('../models/collegeModel')

const strregEx = /^\w[A-Za-z\s]{1,}[\.]{0,1}[A-Za-z\s]{0,}$/

//body valiadation
const isValidBody = function (y) {
    return Object.keys(y).length > 0
}

const createCollege = async function (req, res) {
    try {
        let data = req.body

        let collegename = req.body.name

        if (!isValidBody(data)) return res.status(400).send({ status: false, msg: "data not found" })

        if (!data.name || typeof (data.name) != 'string' || !data.name.match(strregEx)) return res.status(400).send({ status: false, msg: "College name is not found in valid Format" })
        let repeatedName = await collegeModel.findOne({ name: collegename })
        if (repeatedName) return res.status(400).send({ status: false, msg: `${collegename} is Already Registered ` })

        
        if (!data.fullName || typeof (data.fullName) != 'string' || !data.fullName.match(strregEx)) return res.status(400).send({ status: false, msg: "College fullName is not found in valid Format" })

         
        if (!data.logoLink || !data.logoLink.match(/[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/)) return res.status(400).send({ status: false, msg: "link not found" })


        let createCollege = await collegeModel.create(data)
        res.status(201).send({ status: true, data: createCollege })
    } catch (err) {
        res.status(500).send({ status: false, msg: err.message })
    }
}

module.exports.createCollege = createCollege