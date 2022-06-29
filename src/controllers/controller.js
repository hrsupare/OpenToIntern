const { findOne } = require('../models/collegeModel.js');
const collegeModel = require('../models/collegeModel.js');
const internModel = require('../models/internModel.js');

//create college
const createCollege = async function(req, res){
    try {
        const details = req.body;
        const savedCollege = await collegeModel.create(details);
        return res.status(201).send({status:true, data:savedCollege});
    } catch (error) {
        console.log(error)
        return res.status(500).send({status:false, messsage: error.message})
    }
}


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




//get college details
const collegeInterns = async function(req, res){
    try {
        const collegeAbbreviation = req.query.collegeName;
        if(!collegeAbbreviation) return res.status(400).send({status:false, message: "enter a college name in filter and it must be abbreviated name"}); //validation1
    
        //inprocess, pushing for README file
    
        return res.status(200).send({status:true, data: "in process"});

    } catch (error) {
        console.log(error);
        return res.status(500).send({status:false, message: error.message})
    }

}

module.exports.collegeInterns = collegeInterns;
module.exports.createCollege = createCollege;
module.exports.createIntern = createIntern;