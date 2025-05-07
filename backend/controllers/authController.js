         if(existingUser){
            return res.status(400).json({
                message:"User already exists"
            })
         }


        const user =  await User.create({
            name,
            password,
            email,
            avatar
         })
         
        const savedUser =  await user.save()
         res
           .status(201)
           .json({
             message: "User created successfully",
             savedUser
           });
        
    } catch (error) {
        res.status(500).json({message:"Internal server Error"})
        
    }  
const User = require("../models/userModel");
const sendToken = require("../utils/jwt");

// Register API
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

// Login API
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


exports.logoutuser = async(req,res) => {
    res
      .cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true
      })
      .json({ sucess: true, message: "Logged out successful" });

}









