const mongoose = require('mongoose');


const collegeSchema = new mongoose.Schema({

    name: {type:String, required:true, unique:true},    //why unique? 
    fullName: {type:String, required:true},     //why not unique?         
    logoLink: {type:String, required:true},     //why not unique
    isDeleted: {type:Boolean, default:false}  

},{timestamps: true});


module.exports = mongoose.model("College", collegeSchema);