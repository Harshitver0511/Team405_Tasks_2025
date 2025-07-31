const express = require('express');
const router = express.Router();
const Note = require('../models/Note');

router.post('/notes', async (req, res) => {
    try {
        const { title, description } = req.body;
        const note = new Note({ title, description });
        await note.save();
        res.status(201).json(note);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/notes', async (req, res) => {
    const notes = await Note.find();
    res.json(notes);
});

module.exports = router;
