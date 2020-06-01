const Test=require('../../models/index').Test
const OrgTests=require('../../models/orgs').OrgTests
const userScore=require('../../models/orgs').userScore
function takeTest(req,res,next){
   if(req.body.testId && req.body.ClubCode){
        Test.findOne({testId:req.body.testId,ClubCode:req.body.ClubCode},(err,result)=>{
            if(err)next(err)
            else {
                    if(result==null)next("no such test or club code is present")
                    else{
                        //send the user question and options
                        var questionSet=[];
                        result.questions.forEach((question)=>{
                            var q={
                                quid: question.Qid,
                                ques:question.ques,
                                options:question.options
                            }
                            questionSet.push(q)
                        })
                        var data={questionSet,testId:result.testId,ClubCode:result.ClubCode}
                        res.send(data)
                    }
            }
        })
   }
   else next("test id or club code is not present")
}
function submitTest(req,res,next){
    if(req.body.ClubCode && req.body.testId){
        Test.findOne({ClubCode:req.body.ClubCode,testId:req.body.testId},(err,res)=>{
            if(err) next(err)
            else{
                if(result==null)next("no such club or test found")
                else{
                        let marks=0;
                        result.questions.forEach((question,index)=>{
                            if(question.ans==req.body.ans[index])marks++ 
                        })
                        var userData=new userScore({RegNo:req.body.RegNo,name:req.body.name,marks})
                        OrgTests.findOne({ClubCode:req.body.ClubCode,testId:req.body.testId},(err,result)=>{
                            if(err)next(err)
                            else{
                              
                                    if(result==null){
                                        // first time creation

                                        var data={
                                        ClubCode:req.body.ClubCode,
                                        testCode:req.body.testId,
                                        usersScores:[userData],
                                        tests:[req.body.testId]
                                        }
                                        result=new OrgTests(data)
                                        result.save().catch((err)=>next(err))
                                    }
                                    else{
                                        // already created then
                                        result.usersScores.addToSet(userData)
                                        result.tests.addToSet(req.body.testId)
                                        res.send("sucessfully submitted")
                                    }
                            }
                        })
                        

                }
            }
        })

    }
    else next("club code or test id is not present")
}

module.exports=[takeTest,submitTest]