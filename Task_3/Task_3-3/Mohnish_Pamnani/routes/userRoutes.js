const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv")
const { protect } = require("../middleware/authmiddleware");
const User = require("../models/User");

dotenv.config()

//Register a new user
router.post("/register", async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const newUser = new User({ name, email, password });
        await newUser.save();

        //jwt token
        const payload = { id: newUser._id };
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "3h" }, (err, token) => {
            if (err) {
                return res.status(500).json({ message: "Error generating token" });
            }
            res.status(201).json({ message: "User registered successfully", token, user: newUser });
        })

    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
})

//Login a user
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        const isPasswordCorrect = await user.comparePassword(password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid password" });
        }
        const payload = { id: user._id };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "2h" }, (err, token) => {
            if (err) {
                return res.status(500).json({ message: "Error generating token" });
            }
            res.status(200).json({
                message: "Login successful", token, user: {
                    user: user._id,
                    name: user.name,
                    email: user.email

                }
            });
        })
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
})

//Get user profile
router.get("/profile", protect, async (req, res) => {
    res.json(req.user);
})
module.exports = router;