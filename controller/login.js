const User=require('../models/user-model');
var session = require('express-session'); 
var bcrypt = require('bcrypt'); 

var login=function(req,res,next){
    var email=req.body.email;
    var password=req.body.password;
    console.log(req.body);
    if(req.body){


    User.findOne({email:email},function(err,user){
     console.log(user);
   if(user){
    bcrypt.compare(password, user.password , function(err, isMatch){
      if(!isMatch){ 
        console.log("User not found");
      res.render('loginalert');       
    
     }else{
       console.log("User found");
       console.log("id is"+user._id);
      req.session.userId=user._id;
      res.redirect('/display');
     }


    })
  }else{
    res.render('loginalert')
  }
  })
}else{
       res.render('loginalert')

  }
}


module.exports=login;