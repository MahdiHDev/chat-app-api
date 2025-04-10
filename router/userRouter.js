const express = require('express');

const { searchuser } = require('../controller/userController');
const isLoggedIn = require('../middlewares/isLoggedIn');

const router = express.Router();

router.get('/searchUser', searchuser);

module.exports = router;
