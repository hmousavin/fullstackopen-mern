const express = require('express');
const { Todo } = require('../mongo');
const router = express.Router();
const mongoose = require('mongoose');
const { getAsync, setAsync } = require('../redis/index');

/* Middleware to log incoming requests */
router.use((req, res, next) => {
  console.log(`🔜 Received request: ${req.method} ${req.path}`);
  next();
});

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({});
  res.send(todos);
});

/* GET single todo by ID. */
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  // Check if the ID is a valid ObjectID
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ error: 'Invalid ID format' });
  }

  try {
    const todo = await Todo.findById(id);
    if (todo) {
      res.send(todo);
    } else {
      res.sendStatus(404); // Todo not found
    }
  } catch (err) {
    console.error('Error while fetching todo:', err); 
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).send({ error: 'Text is required' });

  const todo = await Todo.create({ text, done: false });
  const currentCount = await getAsync('todos');
  await setAsync('todos', (Number(currentCount) || 0) + 1);

  res.status(201).send(todo);
});

/* Middleware to find a todo by ID */
const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params;
  try {
    const todo = await Todo.findById(id);
    if (!todo) return res.sendStatus(404);
    req.todo = todo;
    next();
  } catch (err) {
    res.status(400).send({ error: 'Invalid ID format' });
  }
};

/* Single router for handling a specific todo */
const singleRouter = express.Router();

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete();
  res.sendStatus(200);
});

/* GET todo (not allowed). */
singleRouter.get('/', (req, res) => {
  res.sendStatus(405); // Method Not Allowed
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  const { text, done } = req.body;
  if (text === undefined || done === undefined)
    return res.status(400).send({ error: `Text and done are required! the text is: ${text} and the done, also is: ${done}` });

  const updatedTodo = await Todo.findByIdAndUpdate(
    req.todo.id,
    { text, done },
    { new: true }
  );
  res.status(200).send(updatedTodo);
});

router.use('/:id', findByIdMiddleware, singleRouter);

module.exports = router;
