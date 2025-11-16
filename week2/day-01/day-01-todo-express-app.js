const express = require("express");
const app = express();
const PORT = 3000;
const todo = [];
app.use(express.json());

// Get all todo items
app.get("/todos", (req, res) => {
  res.json(todo);
});
// Add a new todo item
app.post("/todos", (req, res) => {
  const newTodo = req.body;
  todo.push(newTodo);
  res.status(201).json(newTodo);
});
// Update a todo item by index
app.put("/todos/:index", (req, res) => {
  const index = parseInt(req.params.index, 10);

  if (index >= 0 && index < todo.length) {
    todo[index] = req.body;
    res.json(todo[index]);
  } else {
    res.status(404).json({ error: "Todo item not found" });
  }
});

// Delete a todo item by index
app.delete("/todos/:index", (req, res) => {
  const index = parseInt(req.params.index, 10);
  if (index >= 0 && index < todo.length) {
    const deletedTodo = todo.splice(index, 1);
    res.json(deletedTodo[0]);
  } else {
    res.status(404).json({ error: "Todo item not found" });
  }
});
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
