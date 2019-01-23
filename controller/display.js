var Person =require('../models/personSchema');
var session = require('express-session');


var displayUser=function(req,res,next){
     console.log("id"+req.session.userId);
    if(req.session.userId){
  
     
      Person.find({userId:req.session.userId},function(err,users){
       if(err) throw err;
       console.log(users);
        res.render('index',{result:users})
      })
}
else{
	res.redirect('/');
}
}
module.exports=displayUser;