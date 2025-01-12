#!/bin/bash

echo "GET all todos"
curl -X GET http://localhost:3000/todos

echo "GET a specific todo"
curl -X GET curl -X GET http://localhost:3000/todos/67810f9af57ea88603e9496a

echo "POST a new todo"
curl -X POST http://localhost:3000/todos -H "Content-Type: application/json" -d '{"text": "New Task"}'

echo "PUT (update) a todo"
curl -X PUT http://localhost:3000/todos/67810f9af57ea88603e9496a -H "Content-Type: application/json" -d '{"text": "An Updated Task", "done": false}'

echo "DELETE a todo"
curl -X DELETE http://localhost:3000/todos/67810f9af57ea88603e9496a
