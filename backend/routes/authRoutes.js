const express = require("express");
const { registerapi, 
     loginApi, 
     logoutuser,
    forgotPassword, 
     getUserProfile, 
     updatePassword, 
     profileUpdate, 
     getAllUsers, 
     getUser, 
     userUpdate, 
     deleteUser} = require("../controllers/authController");
const { isAuthenicate, authorizeRole } = require("../Middleware/authenicate");
const router = express.Router()

router.post("/register", registerapi); // create user or register 
router.post("/login", loginApi); // login api
router.get("/logout", logoutuser) // logout api
router.post("/password/forgot", forgotPassword); // forgotPassword api
router.get("/myprofile", isAuthenicate, getUserProfile); // myProfile get
router.put("/updatePassword", isAuthenicate, updatePassword); // update password
router.put("/update",isAuthenicate, profileUpdate);

//admin routes..

router.get("/admin/users", isAuthenicate,authorizeRole("admin"), getAllUsers);
router.get("/admin/user/:id", isAuthenicate, authorizeRole("admin"), getUser);
router.put("/admin/user/:id", isAuthenicate, authorizeRole("admin"),userUpdate);
router.delete("/admin/user/:id", isAuthenicate, authorizeRole("admin"), deleteUser);










module.exports = router

