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
    // passing all the validation

            if(req.body.testId==null) next("testId not given")
            Test.findOne({testId:req.body.testId},(err,result)=>{
                if(err)next(err)
                else if(result==null) next("no such test exists")
                else{
                        // iterate through answer array
                        // and find answer values 
                        let totalMarks=0;
                        let match=new Map()
                        result.questions.forEach((value)=>{
                                match.set(value._id,value.ans)

                        })
                        // itertate through object array and 
                        //get the current score
                        req.body.ans.forEach((value)=>{
                            // check if key is there
                            let correctAns=match.get(value._id)
                            // add marks if correct 
                            if(correctAns!=null && correctAns==value.ans){
                                    totalMarks++
                            }
                        })
                        // push the result to user
                    
                        console.log(totalMarks)
                        OrgTests.findOne({testId:req.body.testId},(err,result1)=>{
                            if(err)next(err)
                            else if(result1==null){
                                next("No such test exists")
                               
                            }
                            else {
                                   // add user 
                                    let newUser=userScore({RegNo:req.body.RegNo,marks:totalMarks,name:req.body.Name})
                                   
                                    // for first entry
                                    if(result1.usersScores==null){

                                        result1.usersScores=[newUser];
                                        
                                    }
                                    else result1.usersScores.push(newUser)
                                    console.log(result1)
                                    result1.save()
                                    .then((result1)=>res.send("result1 saved "))
                                    .catch((err)=>next(err))
                            }

                        })
                }
            })
}

module.exports=[takeTest,submitTest]