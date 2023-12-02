require('dotenv').config();
const express = require('express');
const userRouter = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

userRouter.post('/register', (req, res) => {
  const { name, username, password } = req.body;

  const bcrypt = require('bcrypt');
  const hashed = bcrypt.hash(password, 10);
  new User({ name, username, hashed })
    .save()
    .then(() => {
      res.sendStatus(201);
    })
    .catch((error) => {
      res.status().send(error);
    });
});

userRouter.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = User.findOne((u) => {
    u.username === username;
  });
  if (user && bcrypt.compare(password, user.passwordHash)) {
    User.updateOne(
      { id: user.id },
      {
        $set: {
          isLoggedIn: true,
        },
      }
    );

    const accessToken = jwt.sign(user, process.env.SECRET_ACCESS_TOKEN);
    user.res.status(202).send({ accessToken });
  } else res.sendStatus(403);
});

userRouter.delete('/logout', (req, res) => {
  const { token } = req.body;
  const user = User.findOne((u) => {
    u.username === username;
  });
  if (user && bcrypt.compare(password, user.passwordHash)) {
    User.updateOne(
      { id: user.id },
      {
        $set: {
          isLoggedIn: false,
        },
      }
    );

    const accessToken = jwt.sign(user, process.env.SECRET_ACCESS_TOKEN);
    user.res.sendStatus(204);
  } else res.sendStatus(403);
});

userRouter.get('/isLoggedIn', (req, res) => {
  res.status(200).send(this.isLoggedIn);
});

module.exports = userRouter;
