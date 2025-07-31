import Todo from "../models/todoModel.js";
import User from "../models/userModel.js";

export const createTodo = async (req, res) => {
    const { title, body } = req.body;
    try {
        const newTodo = await Todo.create({title,body,userId:req.user._id});
        await User.findByIdAndUpdate(
      req.user._id,
      { $push: { todos: newTodo._id } },
      { new: true } 
    );
        res.status(200).json({message: "Todo created", newTodo});
    } catch (error) {
         console.error(error);
         return res.status(500).json({ error: "Server error", error });
    }
};

export const fetchTodos = async (req, res) => {
    try {
        const todos = await Todo.find({userId: req.user._id});
        res.status(200).json({message:"All todos", todos});
    } catch (error) {
         console.error(error);
         return res.status(500).json({ error: "Server error", error });
    }
};

export const fetchOneTodo = async (req, res) => {
    const { id } = req.params;
  try {
    const todo = await Todo.findOne({ _id: id, userId:req.user._id });
    res.status(200).json({message:"Todo fetched", todo});
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error", error });
  }
};

export const updateTodo =async (req, res) => {
    const { id } = req.params;
  const { title, body } = req.body;
  try {
    const todo = await Todo.findOneAndUpdate(
      {
        _id: id,
        userId:req.user._id
      },
      {
        title,
        body,
      },
      { new: true }
    );
    res.status(201).json({ message:"Todo Updated", todo });
  } catch (error) {
    console.log(error);
    return res.status(500).json({error:"Server error", error});
  }
};

export const deleteTodo = async (req, res) => {
     const { id } = req.params;
  try {
    const todo = await Todo.findOneAndDelete({_id:id,userId:req.user._id});
    res.status(201).json({ "message":"Deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({error:"Server error", error});
  }
};