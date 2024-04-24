const mongoose = require('mongoose');

const uniqueValidator = require('mongoose-unique-validator');

const schema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true
    }, 
    passwordHash: {
        type: String,
        required: true,
        minlength: 5
    },
    favoriteGenre: {
        type: String,
        required: false
    }
});

schema.plugin(uniqueValidator);

module.exports = mongoose.model('User', schema);