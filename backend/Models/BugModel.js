const mongoose = require('mongoose');

const schema = mongoose.Schema({
    name: String,
    details: String,
    steps: String,
    version: String,
    priority: Number,
    assigned: String,
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    time: String,
    completed: Boolean
});

const model = mongoose.model('Bug', schema);

module.exports = model;