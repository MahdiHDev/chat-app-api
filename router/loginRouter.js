const express = require('express');
const { handleLogin } = require('../controller/loginController');

const router = express.Router();

router.get('/', handleLogin);

module.exports = router;
