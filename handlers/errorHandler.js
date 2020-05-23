
const errHandler=(err,req,res,next)=>{
    console.log("err handler reached");
    if(err) res.send({"error":err});
    else res.send("route not found");
}

module.exports={
    errHandler
}
