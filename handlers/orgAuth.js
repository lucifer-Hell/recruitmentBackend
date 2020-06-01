const Mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const Org=require('../models/index').Org;
const jwt=require('jsonwebtoken')
// dont use async until req
// it can also make code complicated
 function signUp(req,res,next){
    // validate
    // check if club code exits
    Org.findOne({ClubName:req.body.ClubName},(err,result)=>{
        if(err) next(err)
        else {
            if(result==null){
                // add the org
                // before that encryp password
                var ecnrypt= bcrypt.hash(req.body.password,5)
                 // add the clb code
                var clubcode= Org.countDocuments((err,count)=>(err)?next(err):req.body.ClubCode=1000+count)
                // once club code is add and ecnrypt is done
                // add it
                Promise.all([ecnrypt,clubcode]).then((values)=>{
                    req.body.password=values[0]
                    console.log(values)
                    var data=new Org(req.body)
                    data.save();
                    var token=jwt.sign({
                        ClubCode:data.ClubCode,
                        ClubName:data.ClubName
                    },process.env.secretKey,{expiresIn:"1h"})
                res.send({token,ClubCode:data.clubCode,ClubName:data.ClubName})
                    
                }).catch((err)=>{console.log(err)
                    next(err)})
                
            }
            else{
                res.send({err:"club already exists"})
            }
        }
    })
}
function login(req,res,next){
    Org.findOne({ClubCode:req.body.ClubCode}).then((result)=>{
        if(result!=null){
            // verify password
           console.log(result)
           bcrypt.compare(req.body.password,result.password).then((match)=>{
               if(match){
                var token=jwt.sign({
                    ClubCode:result.ClubCode,
                    ClubName:result.ClubName
                },process.env.secretKey,{expiresIn:"1h"})
                const data={
                    token:token,
                    ClubCode:result.ClubCode,
                    ClubName:result.ClubName
                }
                res.send(data)
               }
           })          
        
        }
        else{
            res.send({err:"Invalid code or password"})
        }
    }).catch((err)=>next(err))

}


module.exports=[signUp,login]