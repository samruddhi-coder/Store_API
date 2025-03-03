import jwt from "jsonwebtoken";
import { User } from "../Models/User.js";

export const isAuth = async (req, res, next) => {
  const token = req.header("Authentication-token");
  console.log("Token check");

  //if (!token) return res.status(401).json({ message: "Login First" });
  try {
    const decode = jwt.verify(token, process.env.JWT_KEY);
    console.log("Token data:", decode);
    const id = decode.userID;
    let u1 = await User.findById(id);

    if (!u1) {
      return res.status(404).json({ message: "User not found" });
    }
    req.user = u1;
    next();
  } catch (error) {
    console.error("Token verification failed:", error.message);
    return res.status(401).json({ message: "Authentication invalid or empty" });
  }
};
