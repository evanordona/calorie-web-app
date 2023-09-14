const router = require('express').Router();
const User = require('../models/user-model');


const authCheck = (req, res, next) => {
    if (!req.user) {
        // if user is not logged in
        res.redirect('/auth/login')
    } else {
        // go to next middleware
        next()
    }
};

router.get('/', authCheck, (req, res) => {
    res.send('you are logged in')
});

router.post('/add', authCheck, (req, res) => {
    
    res.send('you are trying to add' + req.body.item)
});

router.delete('/delete', authCheck, (req, res) => {
    res.send('you are trying to delete' + req.body.item)
});

module.exports = router;