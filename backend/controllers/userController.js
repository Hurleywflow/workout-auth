const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

// create a token function
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
}

// login user
const loginUser = async function (req, res) {
  const {email, password} = req.body;
  try {
    const user = await User.login(email, password);
    // create a token
    const token = createToken(user._id);
    res.status(200).json({email, token});
  } catch (err) {
    res.status(400).json({error: err.message});
  }
};
// register user
const signupUser = async (req, res) => {
  const {email, password} = req.body;
  try {
    const user = await User.signup(email, password);
    // create a token
    const token = createToken(user._id);
    res.status(200).json({email, token});
  } catch (err) {
    res.status(400).json({error: err.message});
  }
};
module.exports = {
  loginUser,
  signupUser
};
