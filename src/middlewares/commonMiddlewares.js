const collegeModel = require('../models/collegeModel')
const internModel = require('../models/internModel.js');
const {isCollegeFullName, isCollegeName, isLinkValid, isEmail, isMobile} = require('../validators/validator.js');

//middleware to validate college details:
const collegeValidation = async function (req, res, next) {
    try {
        const data = req.body
        if (Object.keys(data).length === 0) return res.status(400).send({ status: false, message: "cannot create college with empty body" });

        let msg = {};
        if (!isCollegeName(data.name)) msg.nameError = "name(abbreviation) of college is mandatory and must be in valid Format";                  //name validation
        if (!isCollegeFullName(data.fullName)) msg.fullNameError = "fullName of college is mandatory and must be in valid format";   //fullName validation
        if (!isLinkValid(data.logoLink)) msg.logoLinkError =  "logoLink is mandatory and must be in valid link format";               //logoLink validation
        if(Object.keys(msg).length !== 0) return res.status(400).send({status:false, message:msg});
        
        const college = await collegeModel.findOne({ name: data.name.trim() }); 
        if (college)return res.status(400).send({ status: false, message : `${data.name.trim()} is Already Registered ` })     //name exists? validation
       
        next(); 
    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}


//middleware to validate intern details:
const internValidation = async function (req, res, next) {
    try {
        const data = req.body;
        if (Object.keys(data).length === 0) return res.status(400).send({ status: false, message: "cannot create intern with empty body" });   //empty body validation

        const {name, email, mobile,  collegeName} = data;
        const msg = {};

        if (!isCollegeFullName(name)) msg.name = `name of intern is mandatory and must be in proper format`;   //intern's name validation (handled: undefined, null, not all small cases, no special characters, no only spaces or dot, spaces allowed at edges,);

        if(!isEmail(email)) msg["email Error"] = "email is mandatory and must be a valid email"; //email validation

        if (!isMobile(mobile)) msg["mobile Error"] ="mobile no. is mandatory & must be valid";  //mobile validation

        if(!isCollegeName(collegeName)) msg["collegeName Error"] = "collegeName is mandatory & must be in proper abbreviated format"    //collegeName validation

        if(Object.keys(msg).length > 0) return res.status(400).send({status:false, message:msg}); 

        const existMsg ={};
        const emailExists = await internModel.findOne({email:email.trim()});
        if(emailExists) existMsg.emailError =  `email ${email.trim()} is already registered`;
        const mobileExists = await internModel.findOne({mobile:mobile.trim()});
        if(mobileExists) existMsg.mobileError = `mobile no. ${mobile.trim()} is already registered`;

        if(Object.keys(existMsg).length > 0) return res.status(400).send({status:false, message:existMsg}); 
        
        
        next();
    } catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }
}

module.exports.collegeValidation = collegeValidation
module.exports.internValidation = internValidation