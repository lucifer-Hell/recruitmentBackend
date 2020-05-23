const Mongoose =require('mongoose');
const Schema=Mongoose.Schema;

const optionSchema=new Schema({
    value:String
})
const Option=Mongoose.model("Option",optionSchema);

const questionSchema=new Schema({
    Qid:Number,
    ques:String,
    ans:String,
    options:[optionSchema]
})

const testSchema=new Schema({
    testId:String,
    MaxMarks:Number,
    perQuestionMarks:Number,
    negativeMarks:Number,
    questions:[questionSchema],

})
const Question=Mongoose.model("Question",questionSchema);
const Test=Mongoose.model("Test",testSchema);

module.exports={
    Test
}