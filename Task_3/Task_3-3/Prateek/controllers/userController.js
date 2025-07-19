import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(password, salt, async function (err, hash) {
        const newUser = await User.create({
          name,
          email,
          password: hash,
        });
      });
    });
    res.status(200).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error", error });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    let user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });
    const exp = Date.now() + 1000 * 60 * 60;
    const token = jwt.sign({ id: user._id, exp }, process.env.JWT_SECRET);
    res.cookie("Authorization", token, {
      expires: new Date(exp),
      httpOnly: true,
      sameSite: "strict",
    });
    res.status(200).json({ message: "Login successful", user, token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error", error });
  }
};

export const logout = async (req, res) => {
  try {
    res.cookie("Authorization", "", {
      expires: new Date(0),
      httpOnly: true,
      sameSite: "strict",
    });
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error", error });
  }
};

export const profile = async (req, res) => {
  const user  = req.user;
  try {
    res.status(200).json({ message: "User profile", user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error", error });
  }
};
