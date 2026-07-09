import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import asyncHandler from "../middlewares/asyncHandler.js";

const cookieOptions = {
  httpOnly: true,
  maxAge: 7 * 24 * 60 * 60 * 1000,
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  secure: process.env.NODE_ENV === "production",
};

export const registerUser = asyncHandler(async (req, res) => {

  const { name, email, password, role } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: "all fileds are required" });
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) return res.status(400).json({ success: false, message: "User already exist" });

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role
  })

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET, { expiresIn: "7d" }
  );

  const safeUser = {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  };


  res.cookie("token", token, cookieOptions);

  res.status(201).json({ success: true, message: "Registration successful", user : safeUser, token });

})

export const loginUser = asyncHandler(async (req, res) => {

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: "Email and password are required" });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ success: false, message: "user not found" });
  }

  const isMatch = await bcrypt.compare(password, user.password);




  if (!isMatch) {
    return res.status(401).json({ success: false, message: "Invalid credentials" });

  }

  const token = jwt.sign(
    {
      id: user._id,
      role: user.role
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d"
    }
  );

  res.cookie("token", token, cookieOptions);

  res.status(200).json({ success: true, user, token });


});

export const logoutUser = asyncHandler(async (req, res) => {

  res.clearCookie("token", cookieOptions);

  res.status(200).json({ success: true, message: "Logout successful" });

});

export const getMe = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
});

export const updateProfile = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email) {
    return res.status(400).json({
      success: false,
      message: "Name and email are required",
    });
  }

  const existingUser = await User.findOne({
    email,
    _id: { $ne: req.user._id },
  });

  if (existingUser) {
    return res.status(400).json({
      success: false,
      message: "Email already in use",
    });
  }

  const user = await User.findById(req.user._id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  user.name = name;
  user.email = email;

  if (password) {
    user.password = await bcrypt.hash(password, 10);
  }

  await user.save();

  const updatedUser = await User.findById(user._id).select("-password");

  res.status(200).json({
    success: true,
    message: "Profile updated successfully",
    user: updatedUser,
  });
});
