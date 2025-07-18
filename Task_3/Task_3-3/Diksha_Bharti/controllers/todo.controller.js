import { Todos } from "../models/todos.model.js";
import { User } from "../models/user.models.js";

const addTodo = async (req, res) => {
  try {
    // fetch user from req.user
    const user = req.user;

    if (!user) {
      return res.status(400).json({
        message: "User not found. Please signup or register",
      });
    }

    const { title, description, status, dueDate } = req.body;

    if (!title && !dueDate) {
      throw new Error("Title and due dates are required");
    }

    const newTodo = new Todos({
      userId: user._id,
      title: title,
      description: description || "",
      status: status || "",
      dueDate: dueDate,
    });

    await newTodo.save();

    return res.status(200).json({
      message: "Todo saved successfully !",
      newTodo,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error adding todos",
    });
  }
};

const getAllTodos = async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(400).json({
        message: "User not found ! Register or login first",
      });
    }

    const userId = user?._id;
    // got the user
    // find all todos linked with user
    const allTodos = await Todos.find({ userId });

    if (!allTodos) {
      return res.status(200).json({
        message: "No todo is available..Please add one",
      });
    }

    return res.status(200).json({
      message: "Todos fetched successfully!",
      success: true,
      allTodos,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching todos!",
    });
  }
};

const getTodo = async (req, res) => {
  try {
    // get the todo_id from params
    const todoId = req.params.id;
    const user = req.user;

    if (!user) {
      return res.status(400).json({ message: "User not found!" });
    }

    if (!todoId) {
      return res
        .status(400)
        .json({ message: "Todo must be selected to get data", success: false });
    }

    const existingTodo = await Todos.findById(todoId);

    if (!existingTodo) {
      return res.status(400).json({
        message: "No todo available",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Desired todo fetched successfully",
      success: true,
      existingTodo,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching the desired todo",
    });
  }
};

const updateTodo = async (req, res) => {
  try {
    // check if user exist
    const user = req.user;

    if (!user) {
      return res.status(400).json({
        message: "User not found!",
        success: false,
      });
    }

    // get the todo id from params
    const todoId = req.params.id;


    if (!todoId) {
      return res.status(400).json({
        message: "Select a todo to update",
        success: false,
      });
    }

    const existingTodo = await Todos.findById(todoId);

    // get updated info from req.body
    const { title, description, dueDate, status } = req.body;

    if (!title && !dueDate && !description && !status) {
      throw new Error("Please enter information to be updated");
    }

    if (!existingTodo) {
      return res
                .status(400)
                .json({
                    message: "Todo not found",
                    success: false,
                });
    }

    existingTodo.title = title || existingTodo.title,
    existingTodo.description = description || existingTodo.description
    existingTodo.status = status || existingTodo.status
    existingTodo.dueDate = dueDate || existingTodo.dueDate

    // console.log("Updated TODO",existingTodo)
    const updatedTodo = await existingTodo.save();

    return res.status(200).json({
      message: "Todo updated successfully!",
      success: true,
      updatedTodo,
    });
  } 
  catch (error) {
    console.log(error)
    return res.status(500).json({
      message: "Error updating the desired todo!",
      success: false,
    });
  }
};

const deleteTodo = async(req,res) => {
    try {
        // get user
        const user = req.user 
        if(!user){
            return res
                    .status(400)
                    .json({
                        message : "User not found!"
                    })
        }
    
        const todoId = req.params.id
    
        // if not todoId
        if(!todoId){
            return res
                    .status(400)
                    .json({
                            message : "Todo must be selected to be deleted!"
                        })
        }
    
        const existingTodo = await Todos.findByIdAndDelete(todoId)
    
        if(!existingTodo){
            return res
                    .status(400)
                    .json({
                        message : "Todo not found!Please select a valid todo"
                    })
        }
    
        return res
                .status(200)
                .json({
                    message : "Desired todo deleted successfully!!",
                    success : true
        })
    } 
    catch (error) {
        return res
                .status(500)
                .json({
                    message : "Error deleting desired todo!!",
                    success : false
        })
    }
}

export { addTodo, getAllTodos, getTodo, updateTodo, deleteTodo };
