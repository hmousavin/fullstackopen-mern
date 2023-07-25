const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')
const {check, validationResult} = require('express-validator');

const User = require('../models/user')

usersRouter.get('/', async (req, res) => {
  const users = await User.find({})
  res.json(users)
})

usersRouter.post('/', [
  check('username').notEmpty().withMessage('username entry is a must')
                   .isLength({min: 3}).withMessage('atleast 3 characters needed for each username'),
  check('password').notEmpty().withMessage('no blank password is allowed')
                   .isLength({min: 3}).withMessage('password must be at least 3 characters long')
], async (req, res) => {
  const result = validationResult(req)

  if(result.errors[0]) // !result.errors.isEmpty()
    return res.status(400).send(result.errors[0].msg)

  try {
    const user = new User(req.body)
    
    const salt = 10
    user.password = await bcrypt.hash(user.password, salt)
  
    let validationError = await user.validate()
    const api_result = await user.save()
    return res.status(201).json(api_result).end()
  } 
  catch (err)
  {
    return res.status(400)
              .send(err.message)
  }
})

usersRouter.delete('/:id', async (req, res) => {
  await User.findByIdAndRemove(req.params.id)
  return res.status(204)
})

usersRouter.put('/:id', async (req, res) => {
  await User.findByIdAndUpdate(req.params.id, req.body, { new: false })
  return res.status(200)
})

module.exports = usersRouter