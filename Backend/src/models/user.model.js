import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    FullName: {
      type: String,
      required: true,
    },
    Email: {
      type: String,
      required: true,
      unique: true,
    },
    Password: {
      type: String,
      required: true,
      minLength: 6,
    },
    ProfilePic: {
      type: String,
      default: "",
    },
  },
  { timestamps: true },
);

export const User = mongoose.model("User", userSchema);
