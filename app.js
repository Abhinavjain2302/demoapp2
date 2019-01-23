var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
// const cookieSession=require('cookie-session');
// var passportSetup = require('./config/passport-setup')
// const passport=require('passport');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'upload')));
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));
// //cookie function
// app.use(cookieSession({
//    maxAge:24*60*60*1000,
//    keys:['abhinavisawesome']

// }))



// //initialize passport
// app.use(passport.initialize());
// app.use(passport.session());

app.use('/', indexRouter);
app.use('/users', usersRouter);



app.get('/logout', function(req, res){
   console.log("logout successfull");
   req.session.destroy(function(err){
   console.log("session destroyed");
    if(err)
    {
      console.log("error in destroying session");
      req.negotiate(err);
    }
   })
     res.render('login');
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});





// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
   console.log(err);
  //res.send(err);
  res.render('error');
});



module.exports = app;
