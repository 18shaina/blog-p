const express = require("express");
const router = express.Router();
const {  Login, Register,Forgotpassword,Resetpassword } = require("../controller/authController");
 


router.post("/register",  Register);
router.post("/login",  Login);
router.post("/forgot-password", Forgotpassword); 
router.post("/reset-password",Resetpassword)


module.exports = router;
