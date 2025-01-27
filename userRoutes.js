const express = require("express");
const router = express.Router();
const { showUser, addUser, updateUser, deleteUser } = require("../controller/userController");
const checkAuth = require("../middleware/checkauth");


router.get("/showuser", checkAuth,showUser); 
router.post("/adduser", checkAuth,addUser); 
router.put('/update/:id',checkAuth, updateUser);
router.delete("/:id",checkAuth, deleteUser); 

module.exports = router;


