const mongoose = require('mongoose')
const Todo = require('./models/Todo')
const { MONGO_URL } = require('../util/config')

if (MONGO_URL && !mongoose.connection.readyState) 
  mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('✅ Connected to MongoDB'))
    .catch(err => {
        console.error('❌ MongoDB connection error:', err);
    });
else
  console.error('❌ Either MONGO_URL or mongoose.connection is not valid!');

module.exports = {
  Todo
}
