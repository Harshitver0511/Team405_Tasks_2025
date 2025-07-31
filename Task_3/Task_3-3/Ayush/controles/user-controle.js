import { User } from "../models/user-model.js";
import bcrypt from "bcryptjs";

// Token generator helper
const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) throw new Error("Invalid user ID");

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save();

    return { accessToken, refreshToken };
  } catch (error) {
    console.error("Token generation error:", error);
    throw error;
  }
};

// Register new user
const registerUser = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    // console.log("Registering user:", { fullName, email });

    if (!fullName || !email || !password) {
      return res
        .status(400)
        .json({ message: "Please fill all mandatory fields", success: false });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists. Try a different email.",
        success: false,
      });
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    return res.status(201).json({
      message: "Registered successfully",
      success: true,
      user: {
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error registering user", success: false });
  }
};

// Login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please fill all mandatory fields", success: false });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid credentials", success: false });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ message: "Incorrect password", success: false });
    }

    const { refreshToken, accessToken } = await generateAccessAndRefreshToken(
      user._id
    );

    const options = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", 
      sameSite: "Strict",
    };

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json({
        message: "Logged in successfully",
        success: true,
        user: {
          _id: user._id,
          fullName: user.fullName,
          email: user.email,
        },
        accessToken,
        refreshToken,
      });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Login failed", success: false });
  }
};

// Fetch user profile
const getProfile = async (req, res) => {
  try {
    const user = req.user; 
    console.log("Fetching profile for user:", user?._id);
    if (!user) {
      return res
        .status(401)
        .json({ message: "Unauthorized access", success: false });
    }

    return res.status(200).json({
      message: "Profile fetched successfully",
      success: true,
      user,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching profile",
      success: false,
    });
  }
};

// Logout user
const logoutUser = async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      return res
        .status(401)
        .json({ message: "Unauthorized access", success: false });
    }

    await User.findByIdAndUpdate(user._id, { refreshToken: "" });

    const options = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    };

    res
      .clearCookie("accessToken", options)
      .clearCookie("refreshToken", options)
      .status(200)
      .json({ message: "Logged out successfully", success: true });
  } catch (error) {
    return res.status(500).json({
      message: "Logout failed",
      success: false,
    });
  }
};

export { registerUser, loginUser, logoutUser, getProfile };
