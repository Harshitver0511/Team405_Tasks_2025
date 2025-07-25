const mongoose = require("mongoose");

// Define the Note schema
const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
    lowercase: true,
  }
}, {
  timestamps: true  // adds createdAt and updatedAt
});

// Export the Note model
module.exports = mongoose.model("Note", noteSchema);
