const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT;

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to chat app' });
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
