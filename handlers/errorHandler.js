
const errHandler=(err,req,res,next)=>{
    console.log("err handler reached");
    console.log(err)
    if(err) res.send({"error":err});
    else res.send("route not found");
}

module.exports={
    errHandler
}
