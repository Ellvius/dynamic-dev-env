import express from "express";
const usersRoute = express.Router();

import { register, login } from "../controllers/userController.js";

usersRoute.post("/register", register);
usersRoute.post("/login", login);

export default usersRoute;