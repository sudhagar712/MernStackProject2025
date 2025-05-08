const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto")

const userSchema = new mongoose.Schema({
  name: { type: String, required: [true, "Please Enter a name"] },
  email: {
    type: String,
    required: [true, "Please Enter an email address"],
    unique: true,
    validate: [validator.isEmail, "Please enter a valid email"]
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    minLength: [6, "Password must be at least 6 characters"],
    select: false
  },
  avatar: { type: String, required: true },
  role: { type: String, default: "user" },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
 
  createdAt: { type: Date, default: Date.now }
});

// Hash password
userSchema.pre("save", async function(next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Generate JWT
userSchema.methods.getJwtToken = function() {
  return jwt.sign({ id: this.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_TIME
  });
};

// Compare password
userSchema.methods.isValidPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};



userSchema.methods.getResetPassword = async function (){
    //Generate Token 
    const token = crypto.randomBytes(20).toString('hex')

    //Generate Hash and set  to resetPassword
    this.resetPasswordToken =  crypto.createHash('sha256').update(token).digest('hex')

    //set token expireTime 
    this.resetPasswordExpire = Date.now() + 30 * 60 *1000

    return token
}




module.exports = mongoose.model("User", userSchema);
