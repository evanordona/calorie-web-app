const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const User = require('../models/user-model');
const keys = require('./keys');
const { use } = require('../routes/auth-routes');


passport.serializeUser((user, done) => {
    console.log("Serializing user:", user.id)
    done(null, user);
})

passport.deserializeUser((user, done) => {
   done(null, user);
})

passport.use(
    new GoogleStrategy({
        //options for the google strat
        callbackURL: 'http://localhost:5000/auth/google/redirect',
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret,
        passReqToCallback: true
    }, async (req, accessToken, refreshToken, profile, done) => {
        // check if user already exists in db
        const user = await User.findOne({ googleId: profile.id }).then((user) => {
            if (user) {
                //already have user
                console.log('user is ' + user)
                
                done(null, user)

            } else {
                // create user
                new User({
                    username: profile.name.givenName,
                    googleId: profile.id,
                    streak: 0,
                    table: {
                        total: 0,
                        date: new Date().toISOString(),
                        food: {
                            test123: 5000
                        }
                    }
                }).save().then((new_user) => {
                    console.log('new_user created: ' + new_user)
                    done(null, new_user)
                })
            }
        })


    })

)
