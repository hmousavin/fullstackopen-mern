const { StatusCodes } = require('http-status-codes');
const express = require('express');
const db = require('./src/db');
const server = express();

db.connect();
server.use('/user', require('./src/controllers/user'));

server.get('/', (req, res) => {
  res.sendStatus(StatusCodes.NOT_FOUND);
});

const config = require('./src/utils/config');
server.listen(config.PORT);
