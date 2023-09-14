const router = require('express').Router();
const passport = require('passport');


const successLoginUrl = 'http://localhost:5173/login/success';
const errorLoginUrl = 'http://localhost:5173/login/error';


router.get('/login', (req, res) => {
    res.send('login page')
})

router.get("/login/success", (req, res) =>{
    if (req.user) {
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
    // handle with passport
    req.logout();
    res.redirect('http://localhost:5173/')
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
        res.send("thank you for signing in!")
    })

module.exports = router;