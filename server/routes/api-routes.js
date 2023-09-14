const router = require('express').Router();
const User = require('../models/user-model');
const { currentUser } = require('../config/passport-setup');

const authCheck = (req, res, next) => {
    if (!req.user) {
        // if user is not logged in
        res.status(401).send("Not logged in!!")
    } else {
        // go to next middleware
        next()
    }
};

router.get('/', authCheck, (req, res) => {
    res.send('you are logged in')
});

router.get("/user", async (req, res) => {
    console.log("API ROUTES USER - ", req.user)
    res.send(req.user);
})

router.post('/add', authCheck, (req, res) => {

    res.send('you are trying to add' + req.body.item)
});

router.delete('/delete', authCheck, (req, res) => {
    res.send('you are trying to delete' + req.body.item)
});

module.exports = router;