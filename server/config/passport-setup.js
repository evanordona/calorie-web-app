const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const User = require('../models/user-model');
const keys = require('./keys');

passport.serializeUser((user, done) =>{
    done(null, user.id);
})

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user)
    })
})

passport.use(
    new GoogleStrategy({
        //options for the google strat
        callbackURL: '/auth/google/redirect',

        // TODO: Hide these keys
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret

    }, (accessToken, refreshToken, profile, done) => {
        // check if user already exists in db
        User.findOne({ googleId: profile.id }).then((user) => {
            if (user) {
                //already have user
                console.log('user is ' + user)
                done(null, user)

            } else {
                // create user
                new User({
                    username: profile.displayName,
                    googleId: profile.id,
                    goal: 0,
                }).save().then((new_user) => {
                    console.log('new_user created: ' + new_user)
                    done(null, new_user)
                })
            }
        })


    })

)