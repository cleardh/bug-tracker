require('dotenv').config();
const route = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../../Models/UserModel');
const verifyToken = require('../Middlewares/verifyToken');

function generateToken(res, user) {
    const token = jwt.sign({ ...user }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: 86400
    });
    res.cookie('token', token, {
        // expires: new Date(Date.now() + 86400),
        maxAge: 1000 * 60 * 60 * 24, // 1d
        signed: true,
        httpOnly: true,
        // secure: true
    });
}

async function hashPassword(password) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
}

route.post('/user', (req, res) => {
    if (!req.body.username || !req.body.password) return res.status(400).send('Username and password are required');
    UserModel.findOne({ username: req.body.username }).then(async user => {
        if (user) {
            return res.status(400).send('Username already exists');
        } else {
            const password = await hashPassword(req.body.password);
            UserModel.create({ ...req.body, password }).then(async newUser => {
                if (!newUser) return res.status(400).send('There has been an error');
                await generateToken(res, newUser);
                res.send(newUser);
            }).catch(err => res.status(400).send(err));
        }
    }).catch(err => res.status(400).send(err));
});

route.put('/user', verifyToken, async (req, res) => {
    const { _id, username, role } = req.body;
    const password = await hashPassword(req.body.password);
    UserModel.findByIdAndUpdate(_id, { username, password, role }, { new: true, useFindAndModify: false }).then(user => {
        if (!user) return res.status(400).send('No user');
        res.send('User updated');
    }).catch(err => res.status(400).send(err));
});

// Signin
route.post('/', (req, res) => {
    const { username, password } = req.body;
    UserModel.findOne({ username }).then(async user => {
        if (!user) return res.status(400).send('User not found');
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).send('Incorrect credentials');
        await generateToken(res, user);
        res.send(user);
    }).catch(err => console.log(err));
});

// Signout
route.post('/logout', (req, res) => {
    if (req.signedCookies.token) res.clearCookie('token').send(false);
});

// Check login state
route.get('/loggedin', verifyToken, (req, res) => {
    if (!req.signedCookies.token) return res.send(false);
    delete req.user._doc.password;
    res.send(req.user._doc);
});

route.get('/', verifyToken, (req, res) => {
    UserModel.find().then(users => {
        if (!users) return res.status(400).send('No users');
        users.forEach(user => {
            user.password = undefined;
        });
        res.send(users);
    }).catch(err => res.status(400).send(err));
});

route.delete('/:id', verifyToken, (req, res) => {
    UserModel.findByIdAndDelete(req.params.id).then(user => {
        if (!user) return res.status(400).send('No user');
        res.send('User deleted');
    }).catch(err => res.status(400).send(err));
});

module.exports = route;