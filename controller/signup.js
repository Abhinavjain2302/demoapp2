const User=require('../models/user-model');
var bcrypt = require('bcrypt');

var signup=function(req,res,next){
var email=req.body.email;
   var name=req.body.name;
   var password=req.body.password;
  var confirmPassword=req.body.confirmPassword;
    if(req.body){
    if(password===confirmPassword){
     User.findOne({email:email},function(err,user){
       console.log(user);
       if(user){
            console.log("please login" + user)
             res.render('signupAlert');
       }else{
          
        bcrypt.hash(password, 10, function(err, hash){
        if(err) {
          res.render('login',{success:false,msg:'There was some error!! signup again'});
        }
        password = hash;


        new User({
         username:name,
         email:email,
         password:password
       }).save(function(err,result){
         console.log("user created");
         res.redirect('/')
       })
      })
    }
 
 })
   }
   else{
    res.render('passwordAlert');
   }
}else{
   res.render('signupAlert');
}
}

 module.exports=signup;