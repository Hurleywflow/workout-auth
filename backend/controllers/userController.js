// login user
const loginUser = async (req, res) => {
  res.json({mssg: 'login user'});
};
// register user
const signupUser = async (req, res) => {
  res.json({mssg: 'signup user'});
};
module.exports = {
  loginUser,
  signupUser
};
