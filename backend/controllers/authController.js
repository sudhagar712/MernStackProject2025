const User = require("../models/userModel")



// Register Api 

exports.registerapi = async(req,res)=>{
    try {
         const { name, email, password, avatar } = req.body;

         const existingUser = await User.findOne({email})
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
}


// Login api...
exports.loginApi = async(req,res)=>{
    try {
        const existingUser = await User.findOne({email})
        if(!existingUser){
            res.status(404).json({
                message:"User not resgistered"
            })
            const comparePassword = await 
        }
        
    } catch (error) {
        
    }
}



