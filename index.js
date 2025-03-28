const express = require('express');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 3000;

// internal imports
const loginRouter = require('./router/loginRouter');
const signupRouter = require('./router/signupRouter');

// database connection
mongoose
    .connect(process.env.MONGO_CONNECTION_STRING)
    .then(() => console.log('database connection successful'))
    .catch((err) => console.log(err));

// Middleware
app.use(express.json());

// Routes

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to chat app' });
});
app.use('/login', loginRouter);
app.use('/signup', signupRouter);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
