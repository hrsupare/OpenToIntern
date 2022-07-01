const collegeModel = require('../models/collegeModel.js');
const internModel = require('../models/internModel.js');

// create College         
const createCollege = async function (req, res) {
    try {
        const {name, fullName, logoLink } = req.body;
        const details = {};           
        
        //updating trimmed values of field in request body
        details.name = name.trim();         
        details.fullName = fullName.trim().split(" ").map((x)=> x.charAt(0).toUpperCase() + x.slice(1)).join(" ");
        details.logoLink = logoLink.trim();

        const savedCollege = await collegeModel.create(details);
        return res.status(201).send({ status: true, data: savedCollege });
    } catch (error) {
        return res.status(500).send({ status: false, messsage: error.message })
    }
}

//get college details
const collegeInterns = async function (req, res) {
    try {
        const collegeAbbreviation = req.query.collegeName.toLowerCase();
        if(!collegeAbbreviation) return res.status(400).send({status:false, message: "enter the abbreviated name of a college in a collegeName key at query params"}); //validation1
    
        let college = await collegeModel.findOne({name: collegeAbbreviation}).select({name:1, fullName:1, logoLink:1});
        if(!college) return res.status(404).send({status:false, message:"no college found"});   //validation2
        
        const clgId = college._id       //here conversion into  string is optional,
        const internsList = await internModel.find({collegeId : clgId}).select({name:1, email:1, mobile:1});
        const result =  {...college.toJSON(), interns : internsList};
        delete result._id;
        if(internsList.length === 0) result.interns = "currently, there are no any interns at this college"

        return res.status(200).send({ status: true, data: result });

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

module.exports = { createCollege, collegeInterns }
