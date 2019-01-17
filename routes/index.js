var express = require('express');
var router = express.Router();
const multer = require("multer");
const path = require("path");

const upload = multer({
  dest: path.join(__dirname, '../upload')
});


var createUser=require('../controller/insert');
var displayUser=require('../controller/display');
var updateUser=require('../controller/update');
var deleteUser=require('../controller/delete');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.redirect('/display');
});

router.post('/insert', upload.single('image'), function (req, res, next) {
   createUser(req,res,next);
});


router.get('/display', function (req, res, next) {
       displayUser(req,res,next);
})


router.delete('/delete/:id', function (req, res, next) {
         deleteUser(req,res,next);
});


router.post('/update', upload.single('image'), function (req, res, next) {
        updateUser(req,res,next);
})


module.exports = router;
