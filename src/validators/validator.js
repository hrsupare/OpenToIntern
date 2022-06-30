const collegeModel = require('../models/collegeModel')
const internModel = require('../models/internModel.js');

const strregEx = /^\s*(?=[A-Z])[a-zA-Z\s\.\,]{2,}\s*$/;
console.log(strregEx.test("University of Engineering and Management, Kolkata"));
// let urlregEx = /^(https:\/\/www\.|http:\/\/www\.|www\.)[a-zA-Z0-9\-_.$]+\.[a-zA-Z]{2,5}(:[0-9]{1,5})?(\/[^\s]*)?(.png|.jpeg|.jpg)$/gm
let urlregEx = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/g


function isCollegeFullName(x){
    if(x && x.trim()===0)return false;
    const strregEx = /^\s*(?=[A-Z])[a-zA-Z\s\.\,]{2,}\s*$/;
    return strregEx.test(x);

}function isCollegeName(x){
    if(x && x.trim()===0)return false;
    const strregEx = /^\s*(?=[A-Z])[a-zA-Z\.]{2,}\s*$/;
    return strregEx.test(x);

}
function isLinkValid(x) {
    if (x && x.trim() === 0) return false;
    const strregEx = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/;
    return strregEx.test(x);

}



const collegeValidation = async function (req, res, next) {
    try {
        let data = req.body
        let collegename = req.body.name

        if (Object.keys(data).length === 0) return res.status(400).send({ status: false, msg: "cannot create college with empty body" })

        // if (!data.name || typeof (data.name) != 'string' || !data.name.match(strregEx)) return res.status(400).send({ status: false, msg: "College name is mandatory and must be in valid Format" })
        if (!isCollegeName(data.name)) return res.status(400).send({ status: false, msg: "College name is mandatory and must be in valid Format" })
        data.name = data.name.trim();
        let repeatedName = await collegeModel.findOne({ name: collegename })
        if (repeatedName) return res.status(400).send({ status: false, msg: `${collegename} is Already Registered ` })


        // if (!data.fullName || typeof (data.fullName) != 'string' || !data.fullName.match(strregEx)) return res.status(400).send({ status: false, msg: "College fullName is mandatory and must be in valid format" })
        if (!isCollegeFullName(data.fullName)) return res.status(400).send({ status: false, msg: "College fullName is mandatory and must be in valid format" })
        data.fullName = data.fullName.trim();
        // if (!data.logoLink || !data.logoLink.match(urlregEx)) return res.status(400).send({ status: false, msg: "logoLink is mandatory and must be in valid link format" })
        
        next()
    } catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }
}

const internValidation = async function (req, res, next) {
    try {
        const fieldAllowed = ["name","email","mobile","collegeName"];
        const data = req.body;
        const keyOf = Object.keys(data);
        const receivedKey = fieldAllowed.filter((x) => !keyOf.includes(x));
        if (receivedKey.length) {
          return res
            .status(400)
            .send({ status: "fail", msg: `${receivedKey} field is missing` });
        }
        const { collegeName, name, email, mobile } = data
        if (!(/^[A-Za-z ]{1,29}$/.test(name))) {
            return res
                .status(400)
                .send({ status: false, message: `name is invalid or blank` });
        }
        if (email.length == 0) {
            return res.status(400).send({ status: false, msg: "email is blank" })
        }
        if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
            return res.status(400).send({
                status: false,
                message: `${email} should be a valid email address`,
            });
        }
        if (!(/^[0-9]{1,10}$/.test(mobile))) {
            return res.status(400).send({ status: false, msg: "mobile no is invalid or blank" })
        }
        let numberExist = await internModel.findOne({ "mobile": mobile })
        if (numberExist) {
            return res.status(400).send({ status: false, msg: "mobile number is already registered" })
        }
        let nameExist = await collegeModel.findOne({ name: collegeName })
        // console.log(nameExist)
        if (!nameExist) {
            return res.status(400).send({ status: false, msg: "this collegeName is not present in db" })
        }
        next();
    } catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }
}

module.exports.collegeValidation = collegeValidation

module.exports.internValidation = internValidation




