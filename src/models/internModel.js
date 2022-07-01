const mongoose = require('mongoose'); require('mongoose-type-email')
const ObjectId = mongoose.Schema.Types.ObjectId


const internSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        type: mongoose.SchemaTypes.Email,
        required: true,
        unique: true
    },
    mobile: {
        type: String,
        required: true,
        unique: true,
    },
    collegeId: {
        type: ObjectId,
        ref: "College",         //? mandatory not mentioned in README      
    },
    isDeleted: { type: Boolean, default: false }

}, { timestamps: true });


module.exports = mongoose.model("Intern", internSchema);
