import bcrypt from "bcrypt";
import {User} from "../models/userModel.js"
import jwt from "jsonwebtoken"

export const register = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  try {
    const userExists = await User.findOne({username: username});
    if(userExists) return res.status(404).send({message: "Username already exists"});

    const hashed = await bcrypt.hash(password, 10);
    const newUser = new User({username: username, password: hashed});
    newUser.save();
    return res.status(201).send({message: "registration successful"});
  }
  catch (err) {
    res.status(400).json({message: err.message});
  }
}

export const login = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  try {
    const foundUser = await User.findOne({username});
    if(!foundUser) return res.status(404).json({message: "Username does not exist."});

    const match = await bcrypt.compare(password, foundUser.password);
    if(!match) return res.status(404).send({message: "Invalid password"});

    const token = jwt.sign({id:foundUser._id, username: foundUser.username}, "secrettoken", {expiresIn: "5h"});
    res.status(200).send({token: token, id: foundUser._id});
  }
  catch (err) {
    res.status(400).send({err : err.message});
  }
}


// middleware to check if token is valid

export const verifyUser = async (req, res, next) => {
  const userToken = req.header("Authorization")?.split(' ')[1];
  if(!userToken) res.status(401).send({message: "Login please"});

  try {
    jwt.verify(userToken, "secrettoken", (err, decoded) => {
      if(err) return res.status(500).send({message: err.message});
      req.user = decoded;
      next();
    })
  }
  catch(err) {
    return res.status(400).send({message: err.message});
  }
}