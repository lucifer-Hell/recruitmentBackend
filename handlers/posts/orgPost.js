const tests = require('../../models/tests')

// here posts of questions and test schemas will be handled
const Test=require('../../models/index').Test
const Question=require('../../models/tests').Question
const OrgTests=require('../../models/orgs').OrgTests

function addTest(req,res,next){
    // check if test name already exists
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
    if(!req.params.id)next("Question content can not be empty")
    if(req.body.testId){
        //check if test exists
        Test.findOne({testId:req.body.testId},(err,result)=>{
            if(err)next(err)
            else{
                if(result==null)next("no such test id exists")
                else{   
                            
                            const value ={...(req.body.question),_id:req.params.id}
                            result.questions.addToSet(new Question(value))
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
    if(!req.params.id)next("Question content can not be empty")
    if(!req.body.testId)next("Test id is req");
    Test.findOne({testId:req.body.testId},(err,result)=>{
        if(err)next(err)
        else{
                if(result==null)next("no such test id exists")
                else{
                //    console.log(req.body.question)
                //    console.log(req.params.id)
                    let ques={};
                   result.questions= result.questions.map((q,index)=>{
                        //replace with new ques

                        if(q._id==req.params.id){
                           
                            var newQues={...req.body.question,_id:req.params.id};
                            ques=new Question(newQues)
                             return ques
                            
                        }
                        else return q;

                    })
                    result.save((err,val)=>{
                        if(err)next(err)
                        else {res.send(ques);}
                    })
                }
        }
    }) 
}
function viewQuestions(req,res,next){
    
        Test.findOne({testId:req.body.testId,ClubCode:req.body.ClubCode},(err,result)=>{
            if(err)next(err)
            else {
                if(!result)next("no such test exists")
                else{
                    res.send(result.questions)
                }
            }
        })
   
}

function deleteQuestion(req,res,next){
    if(!req.params.id)next("Question id cant be empty")
    else{
            Test.findOne({testId:req.body.testId},(err,result)=>{
                if(err)next(err)
                else{
                    if(!result)next("test with given testid is not found")
                    else{
                        result.questions=result.questions.filter((q)=>{
                            if(q._id==req.params.id) {
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
    addTest,addQuestion,checkResult,deleteQuestion,modifyQuestion,viewQuestions
]