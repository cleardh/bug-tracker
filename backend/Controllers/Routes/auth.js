const route = require('express').Router();
const UserModel = require('../../Models/UserModel');

route.post('/user', (req, res) => {
    UserModel.create(req.body).then((user) => {
        if (!user) return res.status(400).send('There has been an error');
        res.send(user);
    }).catch(err => res.status(400).send(err));
});

route.put('/user', (req, res) => {
    const { _id, username, password, role } = req.body;
    UserModel.findByIdAndUpdate(_id, { username, password, role }, { new: true, useFindAndModify: false }).then(user => {
        if (!user) return res.status(400).send('No user');
        res.send('User updated');
    }).catch(err => res.status(400).send(err));
});

route.post('/', (req, res) => {
    console.log('reached...');
    UserModel.findOne(req.body).then(user => {
        if (!user) return res.status(400).send('Incorrect credentials');
        res.cookie('user', user);
        res.send(true);
    }).catch(err => res.status(400).send(err));
});

route.get('/', (req, res) => {
    UserModel.find().then(users => {
        if (!users) return res.status(400).send('No users');
        res.send(users);
    }).catch(err => res.status(400).send(err));
});

module.exports = route;