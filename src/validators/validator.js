//========================================useful functions for Validations:=============================================

//college full name validation
function isCollegeFullName(x){
    if(!x) return false;
    const strregEx = /^\s*(?=[A-Za-z])[a-zA-Z\s\.\,]{4,}\s*$/;     //it will also handle strings of only spaces "   " 
    return strregEx.test(x);
}

//abbreviation validation
function isCollegeName(x){
    if(!x) return false;
    const strregEx = /^\s*[a-zA-Z]{2,}\s*$/;
    return strregEx.test(x);
}


function isLinkValid(x) {
    if(!x) return false;   
    const linkRegex = /(http(s?):)[/]{2}[\w]+([/|.|\w|\s|-])*\.(?:jpeg|jpg|gif|png)/;
    return x.match(linkRegex); 
}

//email validation
function isEmail(x){
    if(!x) return false;
    const arr = x.trim().split("@");
    if(arr[0] && arr[0].length >64) return false;   //in case user not give @, then arr[0] will be undefined, so...
    if(arr[1] && arr[1].length >255) return false;

    const regEx = /^\s*[a-zA-Z0-9]+([\.\_\-][a-zA-Z0-9]+)*@[a-z]+([\.\_\-][a-zA-Z0-9]+)*\.[a-z]{2,3}\s*$/;
    return regEx.test(x);
}

//mobile validation
function isMobile(x){
    if(!x) return false;
    const regEx = /^\s*(?=[6789])[0-9]{10}\s*$/;
    return regEx.test(x);
}


// const collegeValidation = async function (req, res, next) {
//     try {
//         const data = req.body
//         if (Object.keys(data).length === 0) return res.status(400).send({ status: false, message: "cannot create college with empty body" });

//         let msg = {};
//         if (!isCollegeName(data.name)) msg.nameError = "College name is mandatory and must be in valid Format";                  //name validation
//         if (!isCollegeFullName(data.fullName)) msg.fullNameError = "College fullName is mandatory and must be in valid format";   //fullName validation
//         if (!isLinkValid(data.logoLink)) msg.logoLinkError =  "logoLink is mandatory and must be in valid link format";               //logoLink validation
//         if(Object.keys(msg).length !== 0) return res.status(400).send({status:false, message:msg});
        
//         const college = await collegeModel.findOne({ name: data.name });
//         if (college)return res.status(400).send({ status: false, message : `${data.name} is Already Registered ` })     //name exists? validation
       
//         data.name = data.name.trim();       //updating trimmed values of field in request body
//         data.fullName = data.fullName.trim().split(" ").map((x)=> x.charAt(0).toUpperCase() + x.slice(1)).join(" ");
//         data.logoLink = data.logoLink.trim();
//         next();
//     } catch (err) {
//         return res.status(500).send({ status: false, message: err.message })
//     }
// }

// const internValidation = async function (req, res, next) {
//     try {
//         const data = req.body;
//         if (Object.keys(data).length === 0) return res.status(400).send({ status: false, message: "cannot create college with empty body" });   //empty body validation

//         const {name, email, mobile,  collegeName} = data;
//         const msg = {};

//         if (!isCollegeFullName(name)) msg.name = `name is mandatory and must be in proper format`;   //intern's name validation (handled: undefined, null, not all small cases, no special characters, no only spaces or dot, spaces allowed at edges,);

//         if(!isEmail(email)) msg["email Error"] = "email is mandatory and must be a valid email"; //email validation

//         if (!isMobile(mobile)) msg["mobile Error"] ="mobile no. is mandatory & must be valid";  //mobile validation

//         if(!isCollegeName(collegeName)) msg["collegeName Error"] = "collegeName is mandatory & must be in proper abbreviated format"    //collegeName validation

//         if(Object.keys(msg).length > 0) return res.status(400).send({status:false, message:msg}); 

//         const existMsg ={};
//         const emailExists = await internModel.findOne({email:email});
//         if(emailExists) existMsg.emailError = "this email is already registered";
//         const mobileExists = await internModel.findOne({mobile:mobile});
//         if(mobileExists) existMsg.mobileError = "this email is already registered";

//         if(Object.keys(existMsg).length > 0) return res.status(400).send({status:false, message:existMsg}); 
        
//         data.name = name.trim().split(" ").map((x)=> x.charAt(0).toUpperCase() + x.slice(1)).join(" "); //candidate name
//         data.email = email.trim();
//         data.mobile = mobile.trim();
//         data.collegeName = collegeName.trim().toLowerCase();
//         next();
//     } catch (err) {
//         return res.status(500).send({ status: false, msg: err.message })
//     }
// }

// module.exports.collegeValidation = collegeValidation
// module.exports.internValidation = internValidation
module.exports = {isCollegeFullName, isCollegeName, isLinkValid, isEmail, isMobile};



