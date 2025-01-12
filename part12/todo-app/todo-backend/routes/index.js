const express = require('express');
const router = express.Router();

const configs = require('../util/config')

let visits = 0

/* GET index data. */
router.get('/', async (req, res) => {
  visits++

  res.send({
    ...configs,
    visits
  });
});

const { getAsync } = require('../redis/index');
router.get('/statistics', async (req, res) => { 
  const count = await getAsync('todos')
  res.send({
    "added_todos": Number(count) || 0
  })
});

module.exports = router;
