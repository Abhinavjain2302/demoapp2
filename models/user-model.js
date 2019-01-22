
var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/mydb');

var Schema=mongoose.Schema;

const userSchema=new Schema({
    username:String,
    googleId:String
});

const User =mongoose.model('User',userSchema);


module.exports=User;
