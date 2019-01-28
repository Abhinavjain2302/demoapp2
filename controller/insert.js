const fs=require('fs');
const path = require("path");
var session = require('express-session');


var Person=require("../models/personSchema");

var createUser=function(req,res,next){
   console.log("id is"+ req.session.userId);
   const tempPath = req.file.path;
   if ((path.extname(req.file.originalname).toLowerCase() === ".png")||(path.extname(req.file.originalname).toLowerCase() === ".jpg")) {
     
    if(req.body.age>0){
     var user=  Person({
     name:req.body.name,
     age:req.body.age,
     imagepath:req.file.filename,
     userId:req.session.userId
    })  
    
    user.save(function(err,result){
     if(err) throw err;
     console.log(result);
    })
      }else{
       res.render('ageAlert');
     }
    } else {
       fs.unlink(tempPath, err => {
        if (err) return handleError(err, res);
       res.render('alert');
      
      });
    }

   


}


module.exports=createUser;