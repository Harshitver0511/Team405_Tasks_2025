import { Todos } from "../models/todo-model.js";

const addTodo = async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const { title, description, status, dueDate } = req.body;

    if (!title || !dueDate) {
      return res.status(400).json({ message: "plesse give required fields" });
    }

    const newTodo = new Todos({
      userId: user._id,
      title,
      description: description || "",
      status: status || "pending", 
      dueDate,
    });

    await newTodo.save();

    return res.status(201).json({
      message: "Todo created successfully",
      success: true,
      newTodo,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error adding todo",
      error: error.message,
    });
  }
};

const getAllTodos = async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const allTodos = await Todos.find({ userId: user._id });

    return res.status(200).json({
      message: "Todos fetched successfully!",
      success: true,
      allTodos,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching todos",
      error: error.message,
    });
  }
};


const getTodo = async (req, res) => {
  try {
    const { id: todoId } = req.params;
    const user = req.user;

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    if (!todoId) {
      return res.status(400).json({ message: "Todo ID is required" });
    }

    const existingTodo = await Todos.findOne({ _id: todoId, userId: user._id });

    if (!existingTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    return res.status(200).json({
      message: "Todo fetched successfully",
      success: true,
      existingTodo,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching the todo",
      error: error.message,
    });
  }
};


const updateTodo = async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const { id: todoId } = req.params;
    if (!todoId) {
      return res.status(400).json({ message: "Todo ID is required" });
    }

    const { title, description, dueDate, status } = req.body;

    if (!title && !description && !dueDate && !status) {
      return res.status(400).json({ message: "At least one field must be updated" });
    }

    const existingTodo = await Todos.findOne({ _id: todoId, userId: user._id });

    if (!existingTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    if (title) existingTodo.title = title;
    if (description) existingTodo.description = description;
    if (dueDate) existingTodo.dueDate = dueDate;
    if (status) existingTodo.status = status;

    const updatedTodo = await existingTodo.save();

    return res.status(200).json({
      message: "Todo updated successfully!",
      success: true,
      updatedTodo,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error updating the todo",
      error: error.message,
    });
  }
};


const deleteTodo = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const { id: todoId } = req.params;
    if (!todoId) {
      return res.status(400).json({ message: "Todo ID is required" });
    }

    const deletedTodo = await Todos.findOneAndDelete({ _id: todoId, userId: user._id });

    if (!deletedTodo) {
      return res.status(404).json({ message: "Todo not found or already deleted" });
    }

    return res.status(200).json({
      message: "Todo deleted successfully!",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error deleting the todo",
      error: error.message,
    });
  }
};

export { addTodo, getAllTodos, getTodo, updateTodo, deleteTodo };
