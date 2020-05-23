const express=require('express');
const router=express.Router();
const {signUp,logIn}=require('../handlers/auth');
router.route("/signUp").post(signUp)
router.route("/logIn").post(logIn);
router.route("/:anyOtherRoute").all((req,res,next)=>{
next("invalid route");
})

module.exports=router;