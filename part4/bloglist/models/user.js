const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:     String,
    username: {
      type:      String, 
      required:  [true, 'username entry is a must'], 
      minLength: [3,    'atleast 3 characters needed for each username'],
    },
    password: String
})

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      
      delete returnedObject.__v

      delete returnedObject.password
    }
})

module.exports = mongoose.model('User', userSchema)