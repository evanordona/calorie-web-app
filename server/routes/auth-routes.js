const router = require('express').Router();
const passport = require('passport');


const successLoginUrl = 'https://gainztracker.onrender.com/login/success';
const errorLoginUrl = 'https://gainztracker.onrender.com';


router.get('/login', (req, res) => {
    res.send('login page')
})

router.get("/login/success", (req, res) => {
    if (req.user) {
        console.log("LOGIN SUCESS ON SERVER")
        res.status(200).json({
            success: true,
            user: req.user,
            cookies: req.cookies,
        })
    }
})


router.get('/login/error', (req, res) => {
    res.send('error login page')
})

router.get('/logout', (req, res) => {
    // Handle with passport
    req.logout(function (err) {
        if (err) { return next(err); }
        console.log('logged out')
        res.redirect('/');
    });
})

router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}))

router.get('/google/redirect',
    passport.authenticate('google', {
        failureMessage: "Cannot login to Google, please try again later c:",
        failureRedirct: errorLoginUrl,
        successRedirect: successLoginUrl
    }), (req, res) => {
        console.log("Auth-routes 30          User: " + req.user)
        alert('signed in')
        res.send("thank you for signing in!")
})

module.exports = router;