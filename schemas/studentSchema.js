const validator = require('validator');
const mongoose = require('mongoose');

let studentSchema = new mongoose.Schema({
    name:{type:String,required:true},
    email:{
        type:String,
        required:true,
        lowercase:true,
        validate:(value)=>{
            return validator.isEmail(value)
        }
    },
    mobile:{type:String,default:'000-0000-000'},
    password:{type:String,required:true},
    mentor:{type:String,default:null},
    createdAt:{type:Date,default:Date.now}
},{
    collection:'student',
    versionKey:false
})

let mentorSchema = new mongoose.Schema({
    name:{type:String,required:true},
    email:{
        type:String,
        required:true,
        lowercase:true,
        validate:(value)=>{
            return validator.isEmail(value)
        }
    },
    mobile:{type:String,default:'000-0000-000'},
    password:{type:String,required:true},
    createdAt:{type:Date,default:Date.now}
},{
    collection:'mentor',
    versionKey:false
})

let studentModel = mongoose.model('student',studentSchema);
let mentorModel = mongoose.model('mentor',mentorSchema);
module.exports={studentModel,mentorModel};