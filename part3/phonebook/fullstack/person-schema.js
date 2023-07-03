const mongoose = require('mongoose')

const personSchema = new mongoose.Schema({
  name:   {type: String, required: [true, 'Blank name is not possible'], minLength: 3},
  number: {type: String, required: [true, 'Phone number is required'  ], validate:{validator: function(v) { return /^\d{2,3}-\d{5,}/.test(v)}, 
                                                                                   message:   props => `${props.value} is not a valid phone number` }}
});

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id;
    delete returnedObject.__v;
  }
})

module.exports = mongoose.model('person', personSchema);