import { User } from "../Models/User.js";
import bcryypt from "bcryptjs";
import jwttokenn from "jsonwebtoken";

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  //console.log("printing data=", req.body);
  if (name == "" || password == "" || email == "") {
    return res.status(400).json({ message: "All fields are required" });
  }

  let userdetail = await User.findOne({ email });
  if (userdetail) {
    return res.status(405).json({
      message: "User with same email exist",
      success: false,
    });
  }
  const hashpassword = await bcryypt.hash(password, 13);

  let data = await User.create({ name, email, password: hashpassword });
  res.json({ message: "User created succesfully", success: true, data });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (password == "" || email == "") {
    return res.status(400).json({ message: "All fields are required" });
  }
  const user = await User.findOne({ email });

  if (!user)
    return res.status(404).json({ message: "User not found", success: false });

  const valipass = await bcryypt.compare(password, user.password);
  if (!valipass)
    return res
      .status(403)
      .json({ message: "Incorrect password", success: false });

  const token = jwttokenn.sign({ userID: user._id }, process.env.JWT_KEY, {
    expiresIn: "1d",
  });
  res.json({ message: `Welcome ${user.name}`, token, success: true });
};
