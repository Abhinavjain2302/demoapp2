var Person =require('../models/personSchema');


var displayUser=function(req,res,next){


      Person.find({},function(err,users){
       if(err) throw err;
       console.log(users);
        res.render('index',{result:users})
      })
}

module.exports=displayUser;