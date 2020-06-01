const Mongoose =require('mongoose');
const Schema=Mongoose.Schema;
const bcrypt=require('bcrypt');
const userTestScoresSchema=new Schema({
    testId:Number,
    score:Number,
    attempted:Boolean
})
                                                                                                                                       

const userSchema=new Schema({
    name:String,
    RegNo:{type:String,unique:true,required:true},
    email:{type:String,unique:true,required:true},
    mobileNo:Number,
    BlockName:String,
    RoomNo:Number,
    ClubCode:Number,
    Score:[userTestScoresSchema],
    password:String
});

// hashing is done on pre save because of its async nature 
// if without hashing the password would save in user then it will be trouble
userSchema.pre('save',function(next){
    //  console.log("this is data:"+data)
    // hashing is done 
    // on the database to prevent seperation of concern
     bcrypt.hash(this.password,5).then((hashedPassword)=>{
        // console.log(hashedPassword);
        this.password=hashedPassword;
         next();
     }).catch((err)=>{
         console.log(err)
         next(err)
        }) 
    })



const UserTestScores=Mongoose.model("UserTestScores",userTestScoresSchema);


const User=Mongoose.model("User",userSchema)


module.exports={
       User
}


