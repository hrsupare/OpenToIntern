const { findOne } = require('../models/collegeModel.js');
const collegeModel = require('../models/collegeModel.js');
const internModel = require('../models/internModel.js');


//create intern
const createIntern = async function(req, res){
    try {
        const {name, email, mobile, collegeName } = req.body;
        const details = {};      //this will handle unnecessary keys coming from req.body

        details.name = name.trim().split(" ").map((x)=> x.charAt(0).toUpperCase() + x.slice(1)).join(" "); //candidate name
        details.email = email.trim();
        details.mobile = mobile.trim();
        details.collegeName = collegeName.trim().toLowerCase();

        const clg = await collegeModel.findOne({name: details.collegeName});
        if(!clg) return res.status(400).send({status:false, message: "sorry! this college has been not registered yet"})

        details.collegeId = clg._id;
        delete details.collegeName;

        const savedIntern = await internModel.create(details);
        return res.status(201).send({status:true, data:savedIntern});

    } catch (error) {
        return res.status(500).send({status:false, messsage: error.message})
    }
    
}
module.exports.createIntern = createIntern