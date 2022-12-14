const express = require('express');
const router = express.Router();

// controllers function
const {signupUser, loginUser} = require('../controllers/userController');

// login route
router.post('/login', loginUser);

// register route
router.post('/signup', signupUser);
module.exports = router;
