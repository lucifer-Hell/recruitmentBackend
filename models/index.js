// main db file 
const mongoose =require('mongoose');
const connDb=(req,res,next)=>{
    mongoose.connect(process.env.DB_URL,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
        console.log("db connected");
        next();
    }).catch((err)=>{
      
        next(err);
    });
    
}
const Test=require('./tests').Test;
const User=require('./users').User;
const Org=require('./orgs').Org;

module.exports={
    connDb,
    Test,User,Org
}