const tests = require('../../models/tests')

// here posts of questions and test schemas will be handled
const Test=require('../../models/index').Test
const Question=require('../../models/tests').Question
const OrgTests=require('../../models/orgs').OrgTests

function addTest(req,res,next){
    // check if test name already exits
    if(req.body.testId){
        Test.findOne({testId:req.body.testId},(err,result)=>{
            if(err) next(err)
            else{
                
                if (result==null){
                   
                    // create the test
                    var OrgTest=new OrgTests({testId:req.body.testId,ClubCode:req.body.ClubCode,start:false,usersScores:[]})
                    var test=new Test({testId:req.body.testId,ClubCode:req.body.ClubCode})
                    Promise.all([OrgTest.save(), test.save()])
                    .then((result)=>{res.send(test)})
                    .catch((err)=>next(err))
                }
                else{
                    next({err:"test id already exists"})
                }
            }
        })
    }
    else next({err:"no test id provided "})
}

function addQuestion(req,res,next){
    if(req.body.testId){
        //check if test exists
        Test.findOne({testId:req.body.testId},(err,result)=>{
            if(err)next(err)
            else{
                if(result==null)next({err:"no such test id exists"})
                else{   
                        
                        req.body.questions.forEach((value)=>{
                            result.questions.addToSet(new Question(value))
                        })
                        
                        result.save((err,result)=>{
                            if(err)next(err)
                            else res.send({result})
                        })
                }
            }

        })
        
    }
}

function modifyQuestion(req,res,next){
    if(!req.body.testId)next("question test id is req");
    Test.findOne({testId:req.body.testId},(err,result)=>{
        if(err)next(err)
        else{
                if(result==null)next("no such test id exists")
                else{
                    var newQues=new Question(req.body.question);
                   result.questions= result.questions.map((q,index)=>{
                        //replace with new ques
                        if(q._id==req.body.question._id){
                             return newQues;
                            
                        }
                        else return q;

                    })
                    result.save((err,val)=>{
                        if(err)next(err)
                        else res.send(val);
                    })
                }
        }


    })
    
    
}

function deleteQuestion(req,res,next){
    if(!req.body.question._id)next("Question id cant be empty")
    else{
            Test.findOne({testId:req.body.testId},(err,result)=>{
                if(err)next(err)
                else{
                    if(!result)next("Result is empty")
                    else{
                        result.questions=result.questions.filter((q)=>{
                            if(q._id==req.body.question._id) {
                                return false;
                            }
                            else return true;
                        })
                        result.save().then((result)=>res.send(result)).catch((err)=>res.send(err))

                    }
                }
            })
    }
}

function checkResult(req,res,next){
    if(req.body.testId==null) next("test id is null")
    else {
            OrgTests.findOne({testId:req.body.testId,ClubCode:req.body.ClubCode},(err,result)=>{
                if(err)next(err)
                else if(result==null)next("no such test or club code exists")
                else {
                        res.send(result.usersScores)
                }
            })
    }
}




module.exports=[
    addTest,addQuestion,checkResult,deleteQuestion,modifyQuestion
]