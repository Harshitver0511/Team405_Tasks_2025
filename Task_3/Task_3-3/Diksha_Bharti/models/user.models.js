import mongoose, { Schema } from "mongoose";
import jwt from 'jsonwebtoken'

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: [true, "Full name is required"],
    },
    email: {
      type: String,
      required: [true, " Email is required"],
      trim: true,
      lowercase: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, " Password is required"],
      trim: true,
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);


// to generate the access token
userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      fullName: this.fullName,
      email: this.email,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

// to generate the refresh token
userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
      {
        _id: this._id,
        fullName: this.fullName,
        email: this.email,
      },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
      }
    );
  };

export const User = mongoose.model("User", userSchema);
