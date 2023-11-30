import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
  fullName: {
    type: String,
    required: [true, 'fullName not provided'],
  },
  username: {
    type: String,
    required: [true, 'no empty username is allowed'],
  },
  passwordHash: {
    type: String,
    required: [true, 'no empty password is allowed'],
  },
});

module.exports = mongoose.model('User', userSchema);
