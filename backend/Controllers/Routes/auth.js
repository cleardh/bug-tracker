const route = require('express').Router();
const userModel = require('../../Models/UserModel');

route.post('/user', (req, res) => {
    userModel.create(req.body).then((user) => {
        if (!user) return res.status(400).send('There has been an error');
        res.send('User created');
    }).catch(err => res.status(400).send(err));
});

route.put('/user', (req, res) => {
    const { _id, name, password, role } = req.body;
    userModel.findByIdAndUpdate(_id, { name, password, role }).then(user => {
        if (!user) return res.status(400).send('No user');
        res.send('User updated');
    }).catch(err => res.status(400).send(err));
});

route.post('/', (req, res) => {
    userModel.findOne(req.body).then(user => {
        if (!user) return res.status(400).send('Incorrect credentials');
        res.cookie('user', user);
        res.send(true);
    }).catch(err => res.status(400).send(err));
});

route.get('/', (req, res) => {
    userModel.find().then(users => {
        if (!users) return res.status(400).send('No users');
        res.send(users);
    }).catch(err => res.status(400).send(err));
});

module.exports = route;