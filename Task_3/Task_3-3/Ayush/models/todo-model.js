import mongoose, { Schema } from 'mongoose'

const todoSchema = new Schema({

    userId : {
        type : Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    title : {
        type : String,
        required : [true, "Please enter a title for the todo"],
        unique : true,
    },
    description : {
        type : String
    },
    status : {
        type : String,
        enum : ["Pending", "in-progress", "Completed"],
        default : "Pending"
    },
    dueDate : {
        type : Date,
        required : true
    }

},{timestamps : true})

export const Todos = mongoose.model("Todos", todoSchema)