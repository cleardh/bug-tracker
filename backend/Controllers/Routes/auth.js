require('dotenv').config();
const route = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../../Models/UserModel');
const authenticateUser = require('../Middlewares/authToken');

route.post('/user', async (req, res) => {
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);
    UserModel.create({ ...req.body, password }).then((user) => {
        if (!user) return res.status(400).send('There has been an error');
        const token = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: 86400
        });
        res.send({ user, token });
    }).catch(err => res.status(400).send(err));
});

route.put('/user', (req, res) => {
    const { _id, username, password, role } = req.body;
    UserModel.findByIdAndUpdate(_id, { username, password, role }, { new: true, useFindAndModify: false }).then(user => {
        if (!user) return res.status(400).send('No user');
        res.send('User updated');
    }).catch(err => res.status(400).send(err));
});

// Signin
route.post('/', (req, res) => {
    UserModel.findOne({ username: req.body.username, password: req.body.password }).then(user => {
        if (!user) return res.status(400).send('Incorrect credentials');
        res.cookie('user', user, {
            maxAge: 60 * 60 * 1000, // 1 hour
            httpOnly: true,
            signed: true
        });
        res.send(true);
    }).catch(err => console.log(err));
});

// Signout
route.post('/logout', (req, res) => {
    if (req.signedCookies.user) res.clearCookie('user').send(false);
});

// Check login state
route.get('/loggedin', (req, res) => {
    if (!req.signedCookies.user) return res.status(400).send('Logged out');
    res.send(true);
});

route.get('/', (req, res) => {
    UserModel.find().then(users => {
        if (!users) return res.status(400).send('No users');
        res.send(users);
    }).catch(err => res.status(400).send(err));
});

route.delete('/:id', authenticateUser, (req, res) => {
    UserModel.findByIdAndDelete(req.params.id).then(user => {
        if (!user) return res.status(400).send('No user');
        res.send('User deleted');
    }).catch(err => res.status(400).send(err));
});

module.exports = route;