const express = require("express");
const router = express.Router();
const Note = require("../models/Note");

const logger = require("../middleware/logger");
const auth = require("../middleware/auth");

// Apply logging middleware to all routes
router.use(logger);

// @route   POST /notes
// @desc    Add a new note
router.post("/", async (req, res) => {
  try {
    const note = new Note(req.body);
    await note.save();
    res.status(201).json(note);
  } catch (error) {
    res.status(400).json({ message: "Error creating note", error });
  }
});

// @route   GET /notes/:email
// @desc    Get notes by user email (Protected)
router.get("/:email", auth, async (req, res) => {
  try {
    const notes = await Note.find({ userEmail: req.params.email });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching notes", error });
  }
});

// @route   DELETE /notes/:id
// @desc    Delete a note by ID
router.delete("/:id", async (req, res) => {
  try {
    await Note.findByIdAndDelete(req.params.id);
    res.json({ message: "Note deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting note", error });
  }
});

module.exports = router;
