const mongoose = require('mongoose')

const personSchema = new mongoose.Schema({
  id: Number,
  name: String,
  number: String
});

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('person', personSchema);

// const dummyPerson = new Person({
//   id: 1,
//   name: 'mr nobody',
//   number: '123-456-7890'
// })

// dummyPerson.save().then(result => {
//   console.log('note saved!', result)
//   mongoose.connection.close()
// })