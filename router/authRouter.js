const express = require('express');
const { handleSignUp } = require('../controller/signUpController');
const { handleLogin } = require('../controller/loginController');

const router = express.Router();

router.post('/signup', handleSignUp);
router.post('/login', handleLogin);

module.exports = router;
