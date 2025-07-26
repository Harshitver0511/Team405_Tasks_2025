import mongoose, { model, Schema } from "mongoose";

const userSchema = new Schema(
    {
        userName:{
            type: String,
            required: true,
            index: true
        },
        email:{
            type: String,
            required: true,
            lowercase: true,
            trim: true,
            unique: true
        },
        password:{
            type:String,
            required:true,
        }
  }
,{timestamps: true})

export const User = model("User",userSchema)