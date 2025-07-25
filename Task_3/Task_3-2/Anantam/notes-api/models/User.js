const mongoose = require("mongoose");

// Define the User schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
}, {
  timestamps: true  // adds createdAt and updatedAt
});

// Export the User model
module.exports = mongoose.model("User", userSchema);
