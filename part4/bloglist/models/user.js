const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:     String,
    // username: String,
    username: {
      type:      String, 
      required:  [true, 'username entry is a must'], 
      minLength: [3,    'atleast 3 characters needed for each username'],
      // unique:    {
      //   type: [String],
      //   validate: {
      //     validator: async (value) => {
      //       if (this.findOne({ username: value }))
      //         return { message: 'The email address is already in use.' }
      //     }
      //   }
      // }
      unique: [true, async () => { return 'this username is already reserved' }]
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

// const asyncValidators = {
//   username: async (value) => {
//     const user = await User.findOne({ username: value });
//     if (user)
//       return { message: 'this username is already reserved' };
//   }
// };

module.exports = mongoose.model('User', userSchema)

// module.exports = mongoose.model('User', userSchema, {
//   this.validate: asyncValidators
// })