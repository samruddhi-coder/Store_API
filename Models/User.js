import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, require: true },
  email: { type: String, require: true },
  password: { type: String, default: Date.now },
  created_date: { type: Date, require: true },
});

export const User = mongoose.model("userdata", userSchema);
