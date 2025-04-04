const express = require('express');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 3000;

// internal imports
const authRouter = require('./router/authRouter');
const cookieParser = require('cookie-parser');

// database connection
mongoose
    .connect(process.env.MONGO_CONNECTION_STRING)
    .then(() => console.log('database connection successful'))
    .catch((err) => console.log(err));

// request parser
app.use(express.json());

// parse cookies
app.use(cookieParser(process.env.COOKIE_SECRET));

// Routes

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to chat app' });
});
app.use('/auth', authRouter);
// 404 page
app.get('*', (req, res) => {
    res.json({ message: 'No Routes Found' });
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
