const express = require('express');
const { handleSignUp } = require('../controller/signUpController');

const router = express.Router();

router.get('/', handleSignUp);

module.exports = router;
