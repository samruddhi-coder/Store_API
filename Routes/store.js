import express from "express";
import {
  newstore,
  getallstores,
  getstorebyid,
  updatestore,
  deletestore,
} from "../Controllers/storeAPI.js";

import { isAuth } from "../Middlewaree/Auth.js";
const route = express.Router();

//new store
// @api desc :- new store creation
// @api method :- POST
// @api endpoint :- /api/store/new

route.post("/new", isAuth, newstore);

//get all store
// @api desc :- get all store`s
// @api method :- GET
// @api endpoint :- /api/store/

route.get("/all", getallstores);

//get store by id
// @api desc :- get all stores
// @api method :- GET
// @api endpoint :- /api/store/

route.get("/:id", getstorebyid); //for route same "id" used

route.put("/:store_no", isAuth, updatestore); //for route same "id" used

route.delete("/:store_no", isAuth, deletestore); //for route same "id" used

export default route;
