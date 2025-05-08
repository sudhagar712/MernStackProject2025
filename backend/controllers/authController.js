 const User = require("../models/userModel");
const sendEmail = require("../utils/email");
const ErrorHandler = require("../utils/errorHandling");
const sendToken = require("../utils/jwt");

//................................... Register API.........................................................
exports.registerapi = async (req, res) => {
  try {
    const { name, email, password, avatar } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({
      name,
      email,
      password,
      avatar
    });

    sendToken(user, 200, res);


  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};



//..................................................... Login API..................................................

exports.loginApi = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Please enter both fields" });
    }

    const user = await User.findOne({ email }).select("+password");
    if (! user) {
      return res.status(404).json({ message: "Invalid user or password" });
    }

    const isValid = await user.isValidPassword(password);
    if (!isValid) {
      return res.status(401).json({ message: "Invalid user or password" });
    }


   //  
   sendToken(user, 200, res)



  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error",
      error
    });
  }
};


// ............................................logout .........................................................

exports.logoutuser = async(req,res) => {
    res
      .cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true
      })
      .json({ sucess: true, message: "Logged out successful" });

}



//......................................................forgotPassword.........................................

exports.forgotPassword = async(req,res,next) => {
    const user = await User.findOne({email:req.body.email});
    if(!user){
      return next(new ErrorHandler('user not found in this email'))
    }

    const resetToken = user.getResetPassword();
    user.save({validateBeforeSave:false})
    //reset Url 

    const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/password/reset/${resetToken}`
    const message = `Your password reset url is as follow \n \n ${resetUrl}\n\n if you have not requested this mail, then ignore it`


try {

  await sendEmail({
    email: user.email,
    subject:"Msr kart password recovery",
    message

  })

  res.status(200).json({
    success:true,
    message: ` Email sent to ${user.email}`
  })
  
} catch (error) {
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await  user.save({validateBeforeSave:false})
 return next(new ErrorHandler(error.message, 500));
}


}



//......................................................... get userprofile..........................................

exports.getUserProfile = async(req,res,next) => {
     const user = await User.findById(req.user.id)
     res.status(200).json({
      success: true,
      user
     })
}


// ............................................................updatepassword.........................................

exports.updatePassword = async(req,res,next) => {
  const user = await User.findById(req.user.id).select('+password')

  if(!await user.isValidPassword(req.body.oldPassword)){
    return next(new ErrorHandler('old password is incorrect', 401))

  }

  //assign password 
  user.password = req.body.password
  await user.save()
  res.status(200).json({ success: true });
}


//................................................. update profile .......................................

exports.profileUpdate = async(req,res,next) => {
      const newDataUser = {
        name : req.body.name,
        email:req.body.email
      }
    const user =  await User.findByIdAndUpdate(req.user.id, newDataUser, {
      new:true,
      runValidators:true
    })

    res.status(200).json({
      success:true,
      message:"profile update successfully done",
      user

    })
}


//............................Admin.........................

//...................................Admin togetAllUsers.......................................

exports.getAllUsers = async(req,res,next) => {
  const users = await User.find()
  res.status(200).json({
    success:true,
    users
  })
}

//.............togetusers..........................

exports.getUser = async(req,res,next) => {
  const user = await User.findById(req.params.id)
  if(!user){
   return next(new ErrorHandler('User Not found', 404))
  }
  res.status(200).json({
    success:true,
    user
  })
}

//................updateUsers...............

exports.userUpdate = async(req, res, next) => {
   const newDataUser = {
        name : req.body.name,
        email:req.body.email,
        role:req.body.role
      }
    const user =  await User.findByIdAndUpdate(req.params.id, newDataUser, {
      new:true,
      runValidators:true
    })

    res.status(200).json({
      success:true,
      message:"User update  done",
      user
  
    })
  
}



//..................Delete User...........................

exports.deleteUser = async(req,res,next) => {
  const user =  await User.findById(req.params.id )
  if(!user){
    return next(new ErrorHandler('user not found', 404))
  }


  await user.remove();
  res.status(200).json({
    success:true,
    message:"user deleted"
  })

}







