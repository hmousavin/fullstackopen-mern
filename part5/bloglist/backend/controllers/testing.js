const testingRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')

testingRouter.post('/reset', async (request, response) => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('salainen', 10)
  await new User({
    name: 'mluukkai salainen',
    username: 'mluukkai',
    passwordHash: passwordHash,
  }).save()

  response.status(204).end()
})

module.exports = testingRouter