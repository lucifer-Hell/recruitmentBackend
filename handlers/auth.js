// should be removed later not to keep in auth
const sercretKey="spfokapofkap'fojkawpfap'ojgpaojgpaefokjapfokap'fokapofkap'ofkap'ofk"
const bcrypt=require('bcrypt');
const User=require('../models/index').User;
const jwt=require('jsonwebtoken');
// here user will be added
function signUp(req,res,next){
    // use db to save 
    var user=new User(req.body);
    user.save().then((result)=>{
        res.send({msg:"user sucessfully created"})
    }).catch((err)=>{
        next(err);
    })
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
                       
                    const token= jwt.sign({id:"result.ObjectId"},sercretKey,{expiresIn:"0.25h"})
                    const data={
                        "Name":result.name,
                        "RegNo":result.RegNo,
                        "token":token
                        }
                        res.send(data);
                    }
                    else res.send("Password is incorrect")
                }).catch((error)=>{
                    console.log(error)
                    next(error);
                })

            }
           
            
        }
    })

}


module.exports={signUp,logIn}