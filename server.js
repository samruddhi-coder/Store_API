import express from "express";
import mongoose from "mongoose";
import bodyParser from "express";
import userRouter from "./Routes/user.js";
import contactRouter from "./Routes/store.js";
import { config } from "dotenv";

//.env setup

config({ path: ".env" });
const app = express();

app.use(bodyParser.json());

//home routes
app.get("/", (req, res) => {
  res.json({ message: "this is home route" });
});

//user routes
app.use("/api/user", userRouter);

//contact router
app.use("/api/store", contactRouter);

mongoose
  .connect(process.env.MONGO_URL, { dbname: "StoreDB" })
  .then(() => console.log("mongodb is connected"))
  .catch((err) => console.log(err));

const port = process.env.PORT;
app.listen(port, () => console.log(`server is running on port ${port}`));
