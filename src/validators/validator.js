const collegeModel = require('../models/collegeModel')
const internModel = require('../models/internModel.js');


function isCollegeFullName(x){
    // if(x && x.trim().length === 0)return false;
    const strregEx = /^\s*(?=[A-Za-z])[a-zA-Z\s\.\,]{4,}\s*$/;     //it will handle undefined, null, strings of only space  "   " 
    return strregEx.test(x);
}
// console.log(isCollegeFullName("123456"))
/*
string[0].toUpperCase() + string.substring(1);
${s[0].toUpperCase()}${s.slice(1)}`
([initial, ...rest]) => [initial.toUpperCase(), ...rest].join("")
*/
const str1 = "  ibrahim khan  ";
const arr2 = str1.trim().split(" ").map((x)=> x.charAt(0).toUpperCase() + x.slice(1)).join(" ")
console.log(arr2)

function isCollegeName(x){
    // if(x && x.trim().length === 0)return false;
    const strregEx = /^\s*[a-zA-Z]{2,}\s*$/;
    return strregEx.test(x);
}
function isLinkValid(x) {
    if(!x) return false;    //match() method doesn't handles undefined & null cases
    // if (x.trim().length === 0) return false;    //if empty string   it will be handled by below regex 
    const linkRegex = /(http(s?):)[/]{2}[\w]+([/|.|\w|\s|-])*\.(?:jpeg|jpg|gif|png)/;
    return x.match(linkRegex);  //trying by match for practice
}

// console.log(isLinkValid("https://functionup-stg.s3.ap-south-1.amazonaws.com/radon/uem.jpeg"));
// console.log(isLinkValid("https:///functionup-stg.s3.ap-south-1.amazonaws.com/radon/University-of-Engineering-and-Management.jpeg"));
// console.log(isLinkValid("     "));
// console.log(isLinkValid("...."));

//interName validation
// const regEx = /^\s*(?=[A-Za-z])(\.[A-Za-z\s]+)*[a-zA-Z0-9]{2,}\s*$/
// const res = regEx.test("name i.k")
// console.log(res)
//(/^\s*[A-Za-z](\.[A-Za-z\s]+)*{2,64}\s*$/



//email validation
function isEmail(x){
    if(!x) return false;
    const arr = x.trim();
    if(arr[0].length > 64) return false;
    if(arr[1].length > 255) return false;

    const regEx = /^\s*[a-zA-Z0-9]+([\.\_\-][a-zA-Z0-9]+)*@[a-z]+([\.\_\-][a-zA-Z0-9]+)*\.[a-z]{2,3}\s*$/;
    return regEx.test(x);
}


//mobile validation
// (/^(?=[6789])[0-9]{10}$/.test(mobile)




const collegeValidation = async function (req, res, next) {
    try {
        const data = req.body
        if (Object.keys(data).length === 0) return res.status(400).send({ status: false, message: "cannot create college with empty body" });

        let msg = {};
        if (!isCollegeName(data.name)) msg.name = "College name is mandatory and must be in valid Format";                  //name validation
        if (!isCollegeFullName(data.fullName)) msg.fullName = "College fullName is mandatory and must be in valid format";   //fullName validation
        if (!isLinkValid(data.logoLink)) msg.logoLink =  "logoLink is mandatory and must be in valid link format";               //logoLink validation
        if(Object.keys(msg).length !== 0) return res.status(400).send({status:false, message:msg});
        
        const college = await collegeModel.findOne({ name: data.name });
        if (college)return res.status(400).send({ status: false, message : `${data.name} is Already Registered ` })     //name exists? validation
       
        data.name = data.name.trim();       //updating trimmed values of field in request body
        data.fullName = data.fullName.trim().split(" ").map((x)=> x.charAt(0).toUpperCase() + x.slice(1)).join(" ");
        data.logoLink = data.logoLink.trim();
        next();
    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}

const internValidation = async function (req, res, next) {
    try {
        const data = req.body;
        if (Object.keys(data).length === 0) return res.status(400).send({ status: false, message: "cannot create college with empty body" });   //empty body validation

        const {name, email, mobile,  collegeName} = data;
        const msg = {};

        if (!isCollegeFullName(name)) msg.name = `name is mandatory and must be in proper format`;   //intern's name validation (handled: undefined, null, not all small cases, no special characters, no only spaces or dot, spaces allowed at edges,);

        if(!isEmail(email)) msg["email Error"] = "email is mandatory and must be a valid email"; //email validation

        if (!(/^\s*(?=[6789])[0-9]{10}\s*$/.test(mobile))) msg["mobile Error"] ="mobile no. is mandatory & must be valid";  //mobile validation

        if(!isCollegeName(collegeName)) msg["collegeName Error"] = "collegeName is mandatory & must be in proper abbreviated format"    //collegeName validation

        if(Object.keys(msg).length > 0) return res.status(400).send({status:false, message:msg}); 

        const existMsg ={};
        const emailExists = await internModel.findOne({email:email});
        if(emailExists) existMsg.emailError = "this email is already registered";
        const mobileExists = await internModel.findOne({mobile:mobile});
        if(mobileExists) existMsg.mobileError = "this email is already registered";

        if(Object.keys(existMsg).length > 0) return res.status(400).send({status:false, message:existMsg}); 
        
        data.name = name.trim().split(" ").map((x)=> x.charAt(0).toUpperCase() + x.slice(1)).join(" "); //candidate name
        data.email = email.trim();
        data.mobile = mobile.trim();
        data.collegeName = collegeName.trim().toLowerCase();
        next();
    } catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }
}

module.exports.collegeValidation = collegeValidation
module.exports.internValidation = internValidation




