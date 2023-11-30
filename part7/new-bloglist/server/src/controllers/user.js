const express = require('express');
const userRouter = express.Router();
const { StatusCodes } = require('http-status-codes');

let isLoggedIn = false;

userRouter.post('/register', (req, res) => {
  res.sendStatus(StatusCodes.NOT_IMPLEMENTED);
});

userRouter.get('/login', (req, res) => {
  this.isLoggedIn = true;
  res.sendStatus(StatusCodes.OK);
});

userRouter.get('/logout', (req, res) => {
  this.isLoggedIn = false;
  res.sendStatus(StatusCodes.OK);
});

userRouter.get('/isLoggedIn', (req, res) => {
  res.status(StatusCodes.OK).send(this.isLoggedIn);
});

module.exports = userRouter;
