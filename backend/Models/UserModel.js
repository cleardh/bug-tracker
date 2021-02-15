const mongoose = require('mongoose');

const schema = mongoose.Schema({
    username: String,
    password: String,
    role: String
});

const model = mongoose.model('User', schema);

module.exports = model;