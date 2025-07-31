const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  title: { type: String,
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
  timestamps: true  // adds createdAt 
});


module.exports = mongoose.model("Note", noteSchema);
