const route = require('express').Router();
const BugModel = require('../../Models/BugModel');

// Create new bug
route.post('/', (req, res) => {
    BugModel.create(req.body).then(bug => {
        if (!bug) return res.status(400).send('There has been an error');
        res.send(bug);
    }).catch(err => res.status(400).send(err));
});

// Get all bugs
route.get('/', (req, res) => {
    BugModel.find().then(bugs => {
        if (!bugs) return res.status(400).send('No bugs');
        res.send(bugs);
    }).catch(err => res.status(400).send(err));
});

// Get bug by id
route.get('/:id', (req, res) => {
    BugModel.findById(req.params.id).then(bug => {
        if (!bug) return res.status(400).send('No bug found');
        res.send(bug);
    }).catch(err => res.status(400).send(err));
});

// Update bug by id
route.put('/', (req, res) => {
    const { _id, name, details, steps, version, priority, assigned, creator, completed } = req.body;
    BugModel.findByIdAndUpdate(_id, { name, details, steps, version, priority, assigned, creator, completed, time: new Date().toISOString().slice(11, 16) })
    .then(bug => {
        if (!bug) return res.status(400).send('No bug found')
        res.send('Bug updated');
    })
    .catch(err => res.status(400).send(err));
});

// Delete bug by id
route.delete('/:id', (req, res) => {
    BugModel.findByIdAndDelete(req.params.id).then(bug => {
        if (!bug) return res.status(400).send('No bug found');
        res.send('Bug deleted');
    }).catch(err => res.status(400).send(err));
});

module.exports = route;