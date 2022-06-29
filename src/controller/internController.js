const internModel = require('../models/internModel')
const collegeModel = require('../models/collegeModel')

exports.createIntern = async function(req,res){
    try{
    //key validation
    const fieldAllowed = ["name","collegeName","mobile","email"];
    const data = req.body;
    const keyOf = Object.keys(data);
    const receivedKey = fieldAllowed.filter((x) => !keyOf.includes(x));
    if (receivedKey.length) {
      return res
        .status(400)
        .send({ status: "fail", msg: `${receivedKey} field is missing` });
    }
    //key value validation
    const {collegeName,name,email,mobile} = data
    if (!(/^[A-Za-z ]{1,29}$/.test(name))) {
        return res
          .status(400)
          .send({ status: false, message: `name is invalid or blank` });
      }
      if(email.length == 0){
        return res.status(400).send({status:false,msg:"email is blank"})
      }
      if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
        return res.status(400).send({
          status: false,
          message: `${email} should be a valid email address`,
        });
      }
        if(!(/^[0-9]{1,10}$/.test(mobile))){
            return res.status(400).send({status:false,msg:"mobile no is invalid or blank"})
        }
        let numberExist = await internModel.findOne({"mobile":mobile})
        if(numberExist){
            return res.status(400).send({status:false,msg: "mobile number is already registered"})
        }
        // let nameExist = await collegeModel.findOne({name : collegeName})
        // console.log(nameExist)
        // if(!nameExist){
        //     return res.status(400).send({status:false,msg: "this collegeName is not present in db"})
        // }


        const savedObj = {}
        const nameObj = {}
        if(collegeName) nameObj.name = data.collegeName 
        if(name) savedObj.name = data.name
        if(email) savedObj.email = data.email
        if(mobile) savedObj.mobile = data.mobile
        const intern = await internModel.create(data)
        const findIdofCollege = await collegeModel.findOne(nameObj).select({_id : 1})
        const id = findIdofCollege.toString()
        const updateId = await internModel.findOneAndUpdate(savedObj,{$set:findIdofCollege},{new:true})
        res.send({msg : updateId})

    } catch(err){
        res.status(500).send(err.message)
    }
}