const ErrorHandler = require("../utils/errorHandling")
const errorMiddleWare = require("./errorMiddleWare")
const jwt = require("jsonwebtoken")
const User = require("../models/userModel")



exports.isAuthenicate = async (req,res,next) => {
    const {token} = req.cookies

    if(!token ){
        return next(new ErrorHandler('Login first to handle this resources'))
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    next()
 
}


exports.authorizeRole = (...roles) =>{
    return (req,res,next) => {
        if(!roles.includes(req.user.role)){
            return next(new ErrorHandler(`Role ${req.user.role} is not allowed`))
        }
        next()
    }
}