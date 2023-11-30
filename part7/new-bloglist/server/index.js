const express = require('express');
const app = express();

app.use('/user', require('./src/controllers/user'));

app.get('/', (req, res) => {
  res.sendStatus(404);
});

app.listen(3003);
