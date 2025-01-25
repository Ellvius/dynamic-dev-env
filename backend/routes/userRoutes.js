import express from "express";
const usersRoute = express.Router();

import { register, login, verifyUser, addWorkSpace, removeWorkSpace, getWorkSpaces } from "../controllers/userController.js";

usersRoute.post("/register", register);
usersRoute.post("/login", login);
usersRoute.post("/addworkspace", verifyUser, addWorkSpace);
usersRoute.delete("/removeworkspace", verifyUser, removeWorkSpace);
usersRoute.get("/getworkspaces", verifyUser, getWorkSpaces)


export default usersRoute;