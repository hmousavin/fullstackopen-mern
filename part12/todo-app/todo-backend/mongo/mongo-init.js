db.createUser({
  user: 'root',
  pwd: '123',
  roles: [
    {
      role: 'dbOwner',
      db: 'todos',
    },
  ],
});

db.createCollection('todos');

db.todos.insert({ text: 'Write code', done: true });
db.todos.insert({ text: 'Learn about containers', done: false });

console.log("\nUser created successfully! 🔥🔥🔥")