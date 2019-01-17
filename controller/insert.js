const fs=require('fs');
const path = require("path");


var Person=require("../models/personSchema");

var createUser=function(req,res,next){
   const tempPath = req.file.path;
   if ((path.extname(req.file.originalname).toLowerCase() === ".png")||(path.extname(req.file.originalname).toLowerCase() === ".jpg")) {
     
    if(req.body.age>0){
     var user=  Person({
     name:req.body.name,
     age:req.body.age,
     imagepath:req.file.filename
    })  
    
    user.save(function(err,result){
     if(err) throw err;
     console.log(result);
    })
      }
       
       res.redirect('/display');
    } else {
       fs.unlink(tempPath, err => {
        if (err) return handleError(err, res);
       res.render('alert');
      
      });
    }

   


}


module.exports=createUser;