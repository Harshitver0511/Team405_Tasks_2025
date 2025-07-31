const Todo = require('../models/Todo');

const createTodo = async (req, res) => {
  const { title, description } = req.body;

  try {
    const todo = new Todo({
      title,
      description,
      userId: req.user.id,
    });

    await todo.save();
    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.user.id });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getTodoById = async (req, res) => {
  try {
    const todo = await Todo.findOne({ _id: req.params.id, userId: req.user.id });
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.json(todo);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const updateTodo = async (req, res) => {
  const { title, description, completed } = req.body;

  try {
    const todo = await Todo.findOne({ _id: req.params.id, userId: req.user.id });
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    todo.title = title || todo.title;
    todo.description = description || todo.description;
    todo.completed = completed !== undefined ? completed : todo.completed;

    await todo.save();
    res.json(todo);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    res.json({ message: 'Todo deleted' });
  } catch (error) {
    console.error('Delete Todo Error:', error); // Log error for debugging
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { createTodo, getTodos, getTodoById, updateTodo, deleteTodo };
