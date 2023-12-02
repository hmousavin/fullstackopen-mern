const express = require('express');
const userRouter = express.Router();
const { StatusCodes } = require('http-status-codes');
const User = require('../models/user');

userRouter.post('/register', (req, res) => {
  const { name, username, password } = req.body;
  
  const bcrypt = require('bcrypt')
  const hashed = bcrypt.hash(password, 10)
  new User({ name, username, hashed })
    .save()
    .then(() => {
      res.sendStatus(StatusCodes.CREATED);
    })
    .catch((error) => {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
    });
});


userRouter.get('/login', (req, res) => {
  const { username, password } = req.body;
  if (User.find((u) => {u.username === username && u.password === password})){
    
    res.status(StatusCodes.ACCEPTED).send()

  }
  else
    
});

userRouter.get('/logout', (req, res) => {
  this.isLoggedIn = false;
  res.sendStatus(StatusCodes.OK);
});

userRouter.get('/isLoggedIn', (req, res) => {
  res.status(StatusCodes.OK).send(this.isLoggedIn);
});

module.exports = userRouter;
