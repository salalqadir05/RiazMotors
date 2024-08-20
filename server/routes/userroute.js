

const router = require('express').Router();
const {register,login,fetchdetails,updatedetails} = require("../controller/usercontroller");

router.post("/register",register);
router.post("/login",login);
router.post("/fetchdetails",fetchdetails);
router.put("/updateuser/:id",updatedetails);






module.exports = router ;