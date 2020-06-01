const express=require('express');
const router=express.Router();

const [userSignUp,userLogIn]=[...require('../handlers/userAuth')]
const [orgSignUp,orgLogIn]=[...require('../handlers/orgAuth')]
router.route("/user/signUp").post(userSignUp)
router.route("/user/logIn").post(userLogIn)
router.route("/org/signUp").post(orgSignUp)
router.route("/org/logIn").post(orgLogIn)

router.route("/:anyOtherRoute").all((req,res,next)=>{
next("invalid route");
})

module.exports=router;