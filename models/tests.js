const Mongoose =require('mongoose');
const Schema=Mongoose.Schema;



const questionSchema=new Schema({
    Qid:{type:Number,unique:true},
    ques:String,
    ans:String,
    options:[String]
})

const testSchema=new Schema({
    ClubCode:{type:Number,required:true},
    testId:{type:Number,unique:true,required:true},
    MaxMarks:Number,
    perQuestionMarks:Number,
    negativeMarks:Number,
    questions:[questionSchema]
})
const Question=Mongoose.model("Question",questionSchema);
const Test=Mongoose.model("Test",testSchema);

module.exports={
    Test,Question
}