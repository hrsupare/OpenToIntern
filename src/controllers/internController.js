const { findOne } = require('../models/collegeModel.js');
const collegeModel = require('../models/collegeModel.js');
const internModel = require('../models/internModel.js');


//create intern
const createIntern = async function(req, res){
    try {
        const details = req.body;

        const clgName = req.body.collegeName;
        const clg = await collegeModel.findOne({name:clgName});
        if(!clg) return res.status(400).send({status:false, message: "sorry! this college has been not registered yet"})

        details.collegeId = clg._id;
        delete details.collegeName;

        const savedIntern = await internModel.create(details);
        return res.status(201).send({status:true, data:savedIntern});
    } catch (error) {
        console.log(error)
        return res.status(500).send({status:false, messsage: error.message})
    }
    
}
module.exports.createIntern = createIntern