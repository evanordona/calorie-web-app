const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userSchema = new Schema({
    
    googleId: String,
    username: String,
    password: String,
    goal: Number,
    table: {
        date: Date,
       
    },
    prev_tables: Array,
});

const User = mongoose.model('user', userSchema);

module.exports = User;