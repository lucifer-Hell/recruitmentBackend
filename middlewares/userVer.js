const User=require('../models/users').User
const Org=require('../models/index').Org
const OrgTest=require('../models/orgs').OrgTests
const jwt=require('jsonwebtoken')

function verify(req,res,next){
    if(req.body.token==null) next("Tokken Not present")
    // verify token
    jwt.verify(req.body.token,process.env.secretKey,(err,data)=>{
        if(err){
            next(err);
        }else{
                if(data.RegNo!=req.body.RegNo)next({err:"token invalid"})
                else User.findOne({RegNo:data.RegNo},(err,result)=>{
                    if(err)next(err)
                    else{
                        if(result==null) next({err:"No such reg no exists"})
                        else {
                            next();
                        }
                    }      
                    
                })

             }      
    })
}

function clubVerify(req,res,next){
    if(req.body.ClubCode && req.body.ClubName){
            Org.findOne({"ClubCode":req.body.ClubCode,"ClubName":req.body.ClubName},(err,result)=>{
                if(err)next(err)
                if(result==null) next("no such clubcode or clubname exists")
                else {
                        // verified
                        next()
                }
            })
    }
    else next(err)
}

function testVerify(req,res,next){
    if(req.body.testId==null)next("test id is empty")
    OrgTest.findOne({testId:req.body.testId},(err,result)=>{
        if(err)next(err)
        else{
            if(result==null) next("testID doesnot exists")
            else{
                // check if user already attempted
                let found=false;
                result.usersScores.forEach((value)=>{
                    if(value.RegNo==req.body.RegNo){
                        found=true
                        
                    }

                })
                if(found)next("user already attempted")
                else next()
            }
        }
    })
}

module.exports=[verify,clubVerify,testVerify]