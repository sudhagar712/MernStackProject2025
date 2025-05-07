const express = require("express");
const { registerapi, loginApi, logoutuser } = require("../controllers/authController");
const router = express.Router()

router.post("/register", registerapi);
router.post("/login", loginApi);
router.get("/logout", logoutuser)






module.exports = router

