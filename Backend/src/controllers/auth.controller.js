import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

const userSignup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        message: "Please provide username,email,password",
        success: false,
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        message: "User already exists",
        success: false,
      });
    }

    const user = await User.create({
      username,
      email,
      password,
    });
    return res.status(201).json({
      message: "Signup successful. Please login.",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "SignUp failed",
      error: error.message,
      success: false,
    });
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Please provide username,email,password",
        success: false,
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "User does not exist ,please sign-up",
        success: false,
      });
    }

    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) {
      return res.status(404).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

    return res.status(200).json({
      message: "Login Successful",
      token: token,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Login Failed",
      success: false,
    });
  }
};

export { userLogin, userSignup };
