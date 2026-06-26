import bcrypt from "bcryptjs";
import { getAuth } from "firebase-admin/auth";
import { sendWelcomeEmail } from "../emails/emailHandlers.js";
import cloudinary from "../lib/cloudinary.js";
import "../lib/firebaseAdmin.js";
import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";

export const signup = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .json({ message: "Please enter a valid email address" });
    }

    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = new User({ username, email, password: passwordHash });
    if (newUser) {
      //   generateToken(newUser._id, res);
      //   await newUser.save();
      //   res.status(201).json({ message: "User created successfully" });

      const savedUser = await newUser.save();
      generateToken(savedUser._id, res);

      sendWelcomeEmail(
        email, // Replace with savedUser.email in production
        username,
        process.env.CLIENT_URL,
      ).catch((err) => console.error("Welcome email failed:", err));

      return res.status(201).json({
        _id: savedUser._id,
        username: savedUser.username,
        email: savedUser.email,
        profilePic: savedUser.profilePic,
      });
    } else {
      return res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.error("Error in signup controller:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });
    const isPassCorr = await bcrypt.compare(password, user.password);
    if (!isPassCorr)
      return res.status(400).json({ message: "Invalid credentials" });

    generateToken(user._id, res);
    return res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.error("error in login controller: ", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const logout = async (_, res) => {
  const isProduction = process.env.NODE_ENV === "production";

  res.clearCookie("jwt", {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
  });

  return res.status(200).json({
    message: "Logged out successfully",
  });
};

export const updateProfile = async (req, res) => {
  try {
    const { profilePic } = req.body;
    if (!profilePic)
      return res.status(400).json({ message: "profile pic is required" });

    const userId = req.user._id;
    const uploadRes = await cloudinary.uploader.upload(profilePic);

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePic: uploadRes.secure_url },
      { new: true },
    );

    res.status(200).json(updatedUser);
  } catch (err) {
    console.error("error in update profile controller", err);
    res.status(500).json({ message: "internal server error" });
  }
};

export const googleAuth = async (req, res) => {
  try {
    const { token } = req.body;

    const decodedToken = await getAuth().verifyIdToken(token);

    const { uid, email, name, picture } = decodedToken;

    let user = await User.findOne({ email });

    if (!user) {
      let profilePicUrl = "";

      if (picture) {
        const uploadRes = await cloudinary.uploader.upload(picture, {
          folder: "openchitchat/avatars",
        });

        profilePicUrl = uploadRes.secure_url;
      }

      user = await User.create({
        username: name,
        email,
        profilePic: profilePicUrl,
        authProvider: "google",
        googleId: uid,
      });
    }

    generateToken(user._id, res);

    return res.status(200).json(user);
  } catch (error) {
    console.error("google auth error controller", error);

    return res.status(401).json({
      message: "Invalid Google token",
    });
  }
};
