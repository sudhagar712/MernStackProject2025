const mongoose = require("mongoose")
const validator = require("validator")

const userSchema = new mongoose.Schema({
    name:{type:String, required:[true,"Please Enter a name"]},
    email:{type:String,required:[true,"Please Enter a email Address"], unique:true, validate:[validator.isEmail , "Please Enter a Valid email"]},
    password:{type:String,required:[true,"Please Enter a password"], maxLength:[6,"Please cannot exceed 6 character"]},
    avatar:{type:String, required:true},
    role:{type:String, default:"user"},
    resetPasswordToken:String,
    resetPasswordExpire:Date,
    createdAt:{type:Date, default:Date.now}
})


module.exports = mongoose.model("User", userSchema);