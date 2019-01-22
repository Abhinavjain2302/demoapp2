var express = require('express');
var router = express.Router();
const passport=require('passport');


//auth-login

router.get('/login',function(req,res,next){
	res.render('login1');

});


router.get('/logout',function(req,res,next){
//handle with passport
req.logout();
res.redirect('/auth/login')

})


router.get('/google',passport.authenticate('google',{
 scope:['profile']

}),
)

//callback route for google to redirect
router.get('/google/redirect',passport.authenticate('google'),function(req,res,next){
	//res.send(req.user)
	res.redirect('/display')
})

module.exports = router;