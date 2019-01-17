var mongojs = require('mongojs');
var ObjectId = mongojs.ObjectId;
const fs=require('fs');
const path = require("path");

var Person =require('../models/personSchema');


var deleteUser=function(req,res,next){
    Person.find({ _id: ObjectId(req.params.id)},function(err,result){
        var tempPath=path.join(__dirname,"/upload/");
        console.log(tempPath);
        console.log(result);
        console.log(typeof result.imagepath);
    })



    Person.remove({ _id: ObjectId(req.params.id) },function(err,result){
   if(err){
    console.log(err);
   }
   console.log("Deleted");
   


   res.send("success");
  })
}

module.exports=deleteUser;