const internModel = require('../models/internModel')
const collegeModel = require('../models/collegeModel')

exports.createIntern = async function(req,res){
    try{
        let data = req.body
        const savedObj = {}
        const nameObj = {}
        const {collegeName,name,email,mobile} = data
        if(collegeName) nameObj.name = data.collegeName 
        if(name) savedObj.name = data.name
        if(email) savedObj.email = data.email
        if(mobile) savedObj.mobile = data.mobile
        const savedData = await internModel.create(data)
        const findIdofCollege = await collegeModel.findOne(nameObj).select({_id : 1})
        const id = findIdofCollege._id.toString()
        console.log(id)
        const updateId = await internModel.findOneAndUpdate(savedObj,{$set:{collegeId : id}},{new:true})
        res.send({msg : updateId})

    } catch(err){
        res.status(500).send(err.message)
    }
}