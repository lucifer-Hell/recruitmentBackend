
const bcrypt=require('bcrypt');
const User=require('../models/index').User;
const jwt=require('jsonwebtoken');
// here user will be added
function signUp(req,res,next){
    // use db to save 
    if(User.exists(req.body)){
       next({err:"user Already exists"})
    }else{
        
        var user=new User(req.body);
        // hashing is done on user schema place becausse of its async nature
        // if before hashing user.save ocurr then it would be trouble
        user.save().then((result)=>{
            res.send({msg:"user sucessfully created"})
        }).catch((err)=>{
            next(err);
        })
    }
   
}
function logIn(req,res,next){
    
    User.findOne({"RegNo":req.body.RegNo},(err,result)=>{
        // console.log(result);
        if(err)next(err);
        else{
            if(result==null) next("no user found with reg no");
            // match the password
            else{

                bcrypt.compare(req.body.password,result.password).then((matched)=>{
                    if(matched){
                       
                    const token= jwt.sign({RegNo:result.RegNo,Name:result.name},process.env.secretKey,{expiresIn:"0.25h"})
                    const data={
                        "Name":result.name,
                        "RegNo":result.RegNo,
                        "token":token
                        }
                        res.send(data);
                    }
                    else next({err:"Invalid id or Password Please try again"})
                }).catch((error)=>{
                    console.log(error)
                    next(error);
                })

            }
           
            
        }
    })

}


module.exports=[signUp,logIn]