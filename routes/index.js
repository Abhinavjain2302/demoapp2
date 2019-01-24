var express = require('express');
var router = express.Router();
const multer = require("multer");
const path = require("path");
const User=require('../models/user-model');
var session = require('express-session');


const upload = multer({
  dest: path.join(__dirname, '../upload')
});


var createUser=require('../controller/insert');
var displayUser=require('../controller/display');
var updateUser=require('../controller/update');
var deleteUser=require('../controller/delete');
var loginUser=require('../controller/login');
var signupUser=require('../controller/signup')


/* GET home page. */
router.get('/', function (req, res, next) {
   res.render('login');
});


router.post('/login',function(req,res,next){
    loginUser(req,res,next);

})

router.post('/signup',function(req,res,next){
   signupUser(req,res,next);
})



router.post('/insert', upload.single('image'), function (req, res, next) {
   createUser(req,res,next);
});


router.get('/display', function (req, res, next) {
	res.header('Cache-Control','no-cache, private,no-store, must-revalidate,max-stale=0,post-check=0,pre-check=0');
       displayUser(req,res,next);
})


router.delete('/delete/:id', function (req, res, next) {
         deleteUser(req,res,next);
});


router.post('/update', upload.single('image'), function (req, res, next) {
        updateUser(req,res,next);
})


module.exports = router;
