var express = require('express');
var router = express.Router();
const multer = require("multer");
const path = require("path");
var mongojs = require('mongojs');
var ObjectId = mongojs.ObjectId;


const upload = multer({
  dest: path.join(__dirname, '../upload')
});


var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb";



/* GET home page. */
router.get('/', function (req, res, next) {
  res.redirect('/display');
});


router.post('/insert', upload.single('image'), function (req, res, next) {

  // console.log(req.file.filename)
  // const tempPath = req.file.path;
  // const targetPath = path.join(__dirname, "../upload/", req.file.originalname);
  // console.log(targetPath);
  // console.log(tempPath);

  var promise = new Promise(function (resolve, reject) {
    var name = req.body.name;
    var age = req.body.age;
    console.log(typeof age );

     if(age>=0){
   
    MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      var dbo = db.db("mydb");
      var myobj = {};
      myobj.name = name;
      myobj.age = age;
      myobj.imagepath = req.file.filename;
      
      dbo.collection("person").insertOne(myobj, function (err, res) {
        if (err) throw err;
        console.log("1 document inserted");
        db.close();
        resolve("success");
      });

    })
}
else{
     res.redirect('/display');
}
  });

  promise.then(function (msg) {
    res.redirect('/display');
    console.log(msg);
  })
})


router.get('/display', function (req, res, next) {

  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    dbo.collection("person").find({}).toArray(function (err, result) {
      if (err) throw err;
      console.log(result);
      db.close();
      res.render('index', { result: result })
    });
  });
})


router.delete('/delete/:id', function (req, res, next) {
  var id = req.params.id;
  console.log(id);
  MongoClient.connect(url, function (err, db) {
    console.log(db.db('mydb'))
    if (err) throw err;
    ((db.db('mydb')).collection("person")).remove({ _id: ObjectId(req.params.id) }, function (err, result) {
      if (err) {
        console.log(err);
      }
      else {
        res.send("success");
      }
    })
    db.close();
  });


})




router.post('/update', upload.single('image'), function (req, res, next) {
  var name = req.body.name;
  var age = req.body.age;
  var id = req.body.id;
  // console.log(req.body);
  var promise = new Promise(function (resolve, reject) {
    MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      var dbo = db.db("mydb");
      var myquery = { _id: ObjectId(id) };
      var newvalues = { $set: { name: name, age: age, imagepath: req.file.filename } };
      dbo.collection("person").updateOne(myquery, newvalues, function (err, res) {
        if (err) throw err;
        console.log("1 document updated");
        db.close();
        resolve("success");
      });
    })
  });
  promise.then(function (msg) {
    res.redirect('/display');
    console.log(msg);
  })
})


module.exports = router;
