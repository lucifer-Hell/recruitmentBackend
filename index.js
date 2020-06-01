require('dotenv').config();
const crypto=require('crypto')
const express =require('express');
const app=express();
const bodyParser=require('body-parser');
const connDb=require('./models/index').connDb;
const auth=require('./routes/auth');
const post=require('./routes/posts')
const errHandler=require('./handlers/errorHandler').errHandler;
app.use(connDb);
// app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());
app.get("/",(req,res,next)=>{
    res.send("Welcome to mstc:\n backend developed by pankaj shukla");
})
// handle all user related request
app.use("/api/auth/",auth);
app.use("/api/post/",post);
//error handler 
app.use(errHandler);

app.listen(3000,()=>{
    
    console.log("listinening on port 3000");
})
