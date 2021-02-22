const route = require('express').Router();
const BugModel = require('../../Models/BugModel');
const UserModel = require('../../Models/UserModel');
const verifyToken = require('../Middlewares/verifyToken');

// Create new bug
route.post('/', verifyToken, async (req, res) => {
    delete req.user._doc.password;
    const creator = req.user._doc;
    BugModel.create({ ...req.body, time: new Date().toString().slice(4, 24), creator, completed: false }).then(bug => {
        if (!bug) return res.status(400).send('There has been an error');
        res.send(bug);
    }).catch(err => res.status(400).send(err));
});

// Get all bugs
route.get('/', verifyToken, (req, res) => {
    BugModel.find().then(bugs => {
        if (!bugs) return res.status(400).send('No bugs');
        res.send(bugs);
    }).catch(err => res.status(400).send(err));
});

// Get bug by id
route.get('/:id', verifyToken, (req, res) => {
    BugModel.findById(req.params.id).then(bug => {
        if (!bug) return res.status(400).send('No bug found');
        res.send(bug);
    }).catch(err => res.status(400).send(err));
});

// Update bug by id
route.put('/', verifyToken, (req, res) => {
    BugModel.findByIdAndUpdate(req.body._id, { ...req.body, time: new Date().toString().slice(4, 24) }, { new: true, useFindAndModify: false })
    .then(bug => {
        if (!bug) return res.status(400).send('No bug found');
        res.send('Bug updated');
    })
    .catch(err => res.status(400).send(err));
});

// Delete bug by id
route.delete('/:id', verifyToken, (req, res) => {
    BugModel.findByIdAndDelete(req.params.id).then(bug => {
        if (!bug) return res.status(400).send('No bug found');
        res.send('Bug deleted');
    }).catch(err => res.status(400).send(err));
});

module.exports = route;