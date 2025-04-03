const express = require('express');
const { handleSignUp } = require('../controller/signUpController');

const router = express.Router();

router.post('/', handleSignUp);

module.exports = router;
