const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')
const {check, validationResult} = require('express-validator');

const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', { url: 1, title: 1, author: 1 })
  response.json(users.map(user => user.toJSON()))
})

usersRouter.post('/', async (request, response) => {
  const body = request.body

  if (body.password.length < 3) {
    return response.status(400).json({ error: `User validation failed: username: Path password is shorter than the minimum allowed length (3)` })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.json(savedUser)
})

usersRouter.delete('/:id', async (request, response) => {
  await User.findByIdAndRemove(request.params.id)
  return response.status(204)
})

usersRouter.put('/:id', async (request, response) => {
  await User.findByIdAndUpdate(request.params.id, request.body, { new: false })
  return response.status(200)
})

module.exports = usersRouter