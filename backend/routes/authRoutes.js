const express = require("express");
const { registerapi } = require("../controllers/authController");
const router = express.Router()

router.post("/register", registerapi);





module.exports = router

