
var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/mydb');

var Schema=mongoose.Schema;

var personSchema=new Schema({
    name:String,
    age:Number,
    imagepath:String

});

var Person =mongoose.model('Person',personSchema);


module.exports=Person;
