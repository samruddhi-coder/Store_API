import express from "express";
import { register, login } from "../Controllers/userAPI.js";

const route = express.Router();

//user register
// @api desc :- user register
// @api method :- POST
// @api endpoint :- /api/user/register
route.post("/register", register);

//user login
// @api desc :- user login
// @api method :- POST
// @api endpoint :- /api/user/login
route.post("/login", login);
export default route;
