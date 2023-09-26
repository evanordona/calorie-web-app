const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const tableSchema = new mongoose.Schema({
    total: Number,
    date: Date,
    food: {type: Object, sparse: true}
});

const userSchema = new Schema({
    googleId: {
        type: String,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        required: true,
    },
    goal: {
        type: Number,
        default: 0,
    },
    streak: {
        type: Number,
        default: 0,
    },
    table: tableSchema,
    prev_tables: [tableSchema],
});

const User = mongoose.model('user', userSchema);

module.exports = User;