const Mongoose =require('mongoose');
const shortId=require('shortid')
const Schema=Mongoose.Schema;

const userScoreSchema=new Schema({
    RegNo:String,name:String,marks:Number
})

const orgTestsSchema=new Schema({
    
    ClubCode:Number,
    testId:Number,
    start:Boolean,
    usersScores:[userScoreSchema],
    tests:[{type:Schema.Types.ObjectId,ref:"tests"}]
})


const orgSchema=new Schema({
    ClubCode:{type:Number,required:true},
    ClubName:{type:String,unique:true,required:true},
    Email:{type:String},
    MobileNo:Number,
    ExpectedCandidates:Number,
    Extras:String,
    password:String
});
const userScore=Mongoose.model("userScore",userScoreSchema)

const OrgTests=Mongoose.model("OrgTests",orgTestsSchema)
const Org=Mongoose.model("Org",orgSchema);
module.exports={
    userScore,Org,OrgTests
}
