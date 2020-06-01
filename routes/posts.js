// here will be the posts router for user answer submission and
// questions submission by org 
const express=require('express')
// this router will be responsible for handling all types of post
const router =express.Router();
// do verification
// serok
const [userVerify,clubVerify]=require('../middlewares/userVer')
const orgVerify=require('../middlewares/orgVer').verify
const [addTest,addQuestion]=require('../handlers/posts/orgPost')
const[takeTest,submitTest]=[...require('../handlers/posts/userPost')]
// at intial state user is only capable of posting answers
router.route("/user/takeTest").post(userVerify,takeTest)
router.route("/user/submitTest").post(userVerify,clubVerify,submitTest)
router.route("/org/addTest").post((orgVerify),addTest)
router.route("/org/addQuestion").post((orgVerify),(addQuestion))
router.route("*").all((req,res,next)=>res.send("route not found"));
// serok.
module.exports=router;
// 

