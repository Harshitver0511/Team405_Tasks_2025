const express = require("express");
const router = express.Router();
const Todo = require("../models/Todo");
const { protect } = require("../middleware/authmiddleware");

//Create a new todo
router.post("/", protect, async (req, res) => {
    const { title, description } = req.body;
    try {
        const newTodo = new Todo({
            userId: req.user._id,
            title,
            description
        })
        await newTodo.save();
        res.status(201).json({ message: "Todo created successfully", todo: newTodo });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
},
)

//Get all todos
router.get("/", protect, async (req, res) => {
    try {
        const todos = await Todo.find({ userId: req.user._id });
        res.status(200).json(todos);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
})

//Get a single todo
router.get("/:id", protect, async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        if (!todo) {
            return res.status(404).json({ message: "Todo not found" });
        }
        res.status(200).json(todo);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
})

//Update a todo
router.put("/:id",protect, async (req, res) => {
    const { title, description, completed } = req.body;
    try {
        const todo = await Todo.findById(req.params.id);
        if (!todo) {
            return res.status(404).json({ message: "Todo not found" });
        }
        else {
            todo.title = title || todo.title;
            todo.description = description || todo.description;
            todo.completed = completed || todo.completed;
            await todo.save();
            res.status(200).json({ message: "Todo Updated Successfully!" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
})

//Delete a todo
router.delete("/:id",protect,async(req,res)=>{
    try {
        const todo=await Todo.findById(req.params.id);
        if(!todo){
            return res.status(404).json({message:"Todo not found"});
        }
        await todo.deleteOne();
        res.status(200).json({ message: "Todo Deleted Successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
})
module.exports = router;