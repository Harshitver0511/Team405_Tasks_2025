import mongoose, { model, Schema } from "mongoose";

const noteSchema = new Schema(
    {
        title:{
            type: String,
            required: true,
            unique: true
        },
        userEmail:{
            type:String,
            required:true
        },
        description:{
            type:String,
            required:true
        }
},{timestamps: true})

export const Note = model("Note",noteSchema)