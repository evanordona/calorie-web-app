const router = require('express').Router();
const User = require('../models/user-model');

// Custom middleware to check authentication
const isAuth = (req, res, next) => {
    console.log('checking authentication...')
    if (req.isAuthenticated()) {
        console.log('authenticated');
        return next();
    }
    console.log('not authenticated');
    // Handle unauthenticated requests here
    res.status(401).json({ message: 'Unauthorized' });
};

// Protected route that requires authentication
router.get('/user', isAuth, (req, res) => {
    console.log('API ROUTES USER - ', req.user);
    res.json(req.user);
});


const authCheck = (req, res, next) => {
    if (!req.body.user) {
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


router.post('/updateUser', authCheck, async (req, res) => {
    try {
        // Find the user document by Google ID
        const user = await User.findOne({ googleId: req.body.user.googleId });

        if (!user) {
            console.log('User not found');
            return res.status(404).json({ error: 'User not found' });
        }

        user.table = req.body.user.table
        user.streak = req.body.user.streak
        user.prev_tables = req.body.user.prev_tables


        const updatedUser = await user.save();
        console.log(user.table.food)

        console.log('Updated user:', updatedUser);
        res.json(updatedUser);
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ error: 'Error updating user' });
    }
})

router.post('/add', authCheck, async (req, res) => {

    try {
        // Find the user document by Google ID
        const user = await User.findOne({ googleId: req.body.user.googleId });

        if (!user) {
            console.log('User not found');
            return res.status(404).json({ error: 'User not found' });
        }

        // save total
        user.table.total += req.body.newFoodItem.calories
        user.markModified('table.total')
        await user.save();


        // save food

        user.table.food[req.body.newFoodItem.food] = req.body.newFoodItem.calories;
        user.markModified('table');
        const updatedUser = await user.save();
        console.log(user.table.food)

        console.log('Updated user:', updatedUser);
        res.json(updatedUser); // Send the updated user as JSON
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ error: 'Error updating user' });
    }

});

router.delete('/delete', authCheck, async (req, res) => {

    try {
        // Find the user document by Google ID
        const user = await User.findOne({ googleId: req.body.user.googleId });

        if (!user) {
            console.log('User not found');
            return res.status(404).json({ error: 'User not found' });
        }

        // save total
        user.table.total -= req.body.foodItem.calories

        if (user.table.total < 0)
            user.table.total = 0;

        user.markModified('table.total')
        await user.save();


        // save food

        const filteredFoodItems = Object.keys(user.table.food).reduce((acc, key) => {
            if (key !== req.body.foodItem.food) {
                acc[key] = user.table.food[key];
            }
            return acc;
        }, {});

        user.table.food = filteredFoodItems
        user.markModified('table');
        const updatedUser = await user.save();
        console.log(user.table.food)

        console.log('Updated user:', updatedUser);
        res.json(updatedUser); // Send the updated user as JSON
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ error: 'Error updating user' });
    }

});

router.post('/update-goal', authCheck, async (req, res) => {
    try {
        // Find the user document by Google ID
        const user = await User.findOne({ googleId: req.body.user.googleId });

        if (!user) {
            console.log('User not found');
            return res.status(404).json({ error: 'User not found' });
        }

        console.log('Goal: ' + req.body.goal);
        user.goal = req.body.goal;

        // Save the updated user document
        const updatedUser = await user.save();

        console.log('Updated user:', updatedUser);
        res.json(updatedUser); // Send the updated user as JSON
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ error: 'Error updating user' });
    }

});


module.exports = router;