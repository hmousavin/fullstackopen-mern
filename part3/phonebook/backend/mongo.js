const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://admin:${password}@cluster110v2.ye52wou.mongodb.net/?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  id: Number,
  name: String,
  number: String
});

const Person = mongoose.model('Person', personSchema);

const dummyPerson = new Person({
  id: 1,
  name: 'mr nobody',
  number: '123-456-7890'
})

dummyPerson.save().then(result => {
  console.log('note saved!', result)
  mongoose.connection.close()
})