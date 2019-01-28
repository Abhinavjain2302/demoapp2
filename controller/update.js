var mongojs = require('mongojs');
var ObjectId = mongojs.ObjectId;
const fs=require('fs');
const path = require("path");

var Person =require('../models/personSchema');

  
  var updateUser=function(req,res,next){
   const tempPath = req.file.path;
   console.log(tempPath);
   if ((path.extname(req.file.originalname).toLowerCase() === ".png")||(path.extname(req.file.originalname).toLowerCase() === ".jpg")) {

  if(req.body.age>0){
      var name = req.body.name;
  var age = req.body.age;
  var id = req.body.id;

  var myquery = { _id: ObjectId(id) };
  var newvalues = { $set: { name: name, age: age, imagepath: req.file.filename } };
  
  Person.updateOne(myquery,newvalues,function(err,result){
  if(err) {
    console.log(err);
  }else{
    console.log("Data Updated");
  }
   res.redirect('/display');

  })
}
else{
       res.render('ageAlert');
     }
}else {
       fs.unlink(tempPath, err => {
        if (err) return handleError(err, res);
       res.render('alert');
      
      });
    }
 }

module.exports=updateUser;