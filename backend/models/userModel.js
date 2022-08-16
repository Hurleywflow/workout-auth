const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;
const validator = require('validator');
const userSchema = new Schema({
  email: {type: 'string', required: true, unique: true},
  password: {type: 'string', required: true}
});
// static signup method, used to create a new user
userSchema.statics.signup = async function (email, password) {
  // validations by validator package
  if (!email || !password) {
    throw new Error('Email and password are required');
  }
  if (!validator.isEmail(email)) {
    throw new Error('Email is invalid');
  }
  if (!validator.isStrongPassword(password)) {
    throw new Error('Password is not strong enough');
  }

  const exists = await this.findOne({email});
  if (exists) {
    throw new Error('Email in use');
  }
  // generate a salt
  const salt = await bcrypt.genSalt(10);
  // hash the password with salt
  const hash = await bcrypt.hash(password, salt);
  // create a new user
  const user = await this.create({email, password: hash});

  return user;
};

// static login method, used to login a user
userSchema.statics.login = async function (email, password) {
  // validations by validator package
  if (!email || !password) {
    throw new Error('Email and password are required');
  }
  const user = await this.findOne({email});
  if (!user) {
    throw new Error('Invalid email');
  }
  // compare password
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw new Error('Invalid password');
  }
  return user;
};

module.exports = mongoose.model('User', userSchema);
