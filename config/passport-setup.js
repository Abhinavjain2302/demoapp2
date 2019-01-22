const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./passport-setup');
const User = require('../models/user-model')

console.log(keys);

passport.serializeUser(function(user,done){
	done(null,user.id);
})

passport.deserializeUser(function(id,done){
	User.findById(id).then(function(user){
		done(null,user);
	})
	
})



passport.use(
   new GoogleStrategy({
      //Options for google Strategy
      callbackURL: '/auth/google/redirect',
      clientID: '560166611860-mdcuc7dd0dij0jjk5n39jp6iajgibjoc.apps.googleusercontent.com',
      clientSecret: 'afmIjmjPjZFp6AXg02WID3Vo'
   }, function (accessToken, refreshToken, profile, done) {
      //passport callback function
      //find if user already exist
      User.findOne({ googleId: profile.id }).then(function (currentUser) {
         if (currentUser) {
            //already have the user
            console.log("user is" + currentUser);
            done(null,currentUser);
         } else {
            //insert user
            new User({
               username: profile.displayName,
               googleId: profile.id
            }).save().then(function (newUser) {
               console.log('new user created');
               console.log(newUser);
               done(null,newUser);
            })

         }

      })

   })

)

