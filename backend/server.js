require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const app = express();

mongoose.connect(process.env.DB_URL, { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true
}, (err) => {
    if (!err) return console.log('Connected to DB');
});

const PORT = process.env.PORT || 3500;

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

app.use('/auth', require('./Controllers/Routes/auth'));

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));