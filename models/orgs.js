const Mongoose =require('mongoose');
const Schema=Mongoose.Schema;

const orgTestsSchema=new Schema({
    ClubName:String,
    testCode:String,
    start:Boolean,
    usersScores:[{type:Schema.Types.ObjectId,ref:"User"}],
    tests:[{type:Schema.Types.ObjectId,ref:"tests"}]
})


const orgSchema=new Schema({
    ClubName:String,
    Email:String,
    MobileNo:Number,
    ExpectedCandidates:Number,
    Extras:String
});

const OrgTestsSchema=Mongoose.model("OrgTestsSchema",orgTestsSchema);
const Org=Mongoose.model("Org",orgSchema);
module.exports={
    Org
}
