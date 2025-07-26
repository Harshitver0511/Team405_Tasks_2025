import { AsyncHandler } from "../utils/AsyncHandler.js";
import { Note } from "../models/notes.model.js";
import {ApiError} from "../utils/ApiError.js";
import {ApiResponse} from "../utils/ApiResponse.js";
import {User} from "../models/user.model.js"

const postNote = AsyncHandler(async(req,res) => {
    const {title, userEmail, description} = req.body

    if([title, userEmail, description].some((field) => field?.trim() == "")){
        throw new ApiError(400,"All fields are Compulsory")
    }

    const checkUser = await User.findOne({email: userEmail})
    if(!checkUser){
        return res.status(400).json(
            {
                message:"User not present"
            }
        )
    }
    const existedNote = await Note.findOne({title})

    if(existedNote){
        throw new ApiError(409,"Note with this Title is already present")
    }

    const note = await Note.create(
        {
            title,
            userEmail,
            description
        }
    )

    const createdNote = await Note.findById(note._id);

    if(!createdNote){
        throw new ApiError(500,"Something went wrong while posting the notes")
    }

    return res.status(201).json(
        new ApiResponse(200,createdNote,"Note added successfully")
    )
})

const getNotes = AsyncHandler(async(req,res) => {
    const email = req.query.email
    const notes = await Note.find({userEmail: email});

    if(notes.length === 0){
        throw new ApiError(400,"No note is present or server error")
    }

    return res.status(200).json(
        new ApiResponse(200,notes,"Notes with the given email is successfully uploaded")
    )
})

const deleteNote = AsyncHandler(async(req,res) => {
    const deleteNote = await Note.findByIdAndDelete(req.query.id);
    if(!deleteNote){
        throw new ApiError(400,"Note not found")
    }

    return res.status(200).json(
        {
            message:"Note deleted Successfully"
        }
    )
})

export {
    postNote,
    getNotes,
    deleteNote
}