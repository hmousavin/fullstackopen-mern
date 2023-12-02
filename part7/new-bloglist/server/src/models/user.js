const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'name not provided'],
  },
  username: {
    type: String,
    required: [true, 'no empty username is allowed'],
  },
  passwordHash: {
    type: String,
    required: [true, 'no empty password is allowed'],
  },
  isLoggedIn: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('User', userSchema);
