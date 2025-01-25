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

    const token = jwt.sign({id:foundUser._id, username: foundUser.username}, "a", {expiresIn: "5h"});
    res.status(200).send({token: token, id: foundUser._id});
  }
  catch (err) {
    res.status(400).send({err : err.message});
  }
}

export const verifyUser = async (req, res, next) => {
  const userToken = req.header("Authorization")?.split(' ')[1];
  if(!userToken) res.status(401).send({message: "Login please"});

  try {
    jwt.verify(userToken, "a", (err, decoded) => {
      if(err) return res.status(500).send({message: err.message});
      req.user = decoded;
      next();
    })
  }
  catch(err) {
    return res.status(400).send({message: err.message});
  }
}

export const addWorkSpace = async (req, res) => {
  const { newname, username } = req.body;
  if (!newname || !username) {
    return res.status(400).json({ message: "Both username and workspace name (newname) are required." });
  }

  try {
    const foundUser = await User.findOne({ username });
    if (!foundUser) {
      return res.status(404).json({ message: "Username does not exist." });
    }

    if (foundUser.workspaces.includes(newname)) {
      return res.status(400).json({ message: "Workspace already exists." });
    }

    if (foundUser.workspaces.length >= 10) {
      return res.status(400).json({ message: "Cannot add more than 10 workspaces." });
    }

    foundUser.workspaces.push(newname);

    await foundUser.save();

    return res.status(200).json({ message: "Workspace added successfully.", workspaces: foundUser.workspaces });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};


export const removeWorkSpace = async (req, res) => {
  const { workspacename } = req.body;
  const { username } = req.body;

  try {
    const foundUser = await User.findOne({ username });
    if (!foundUser) return res.status(404).json({ message: "Username does not exist." });

    if (!foundUser.workspaces.includes(workspacename)) return res.status(400).json({ message: "Workspace does not exist." });

    foundUser.workspaces = foundUser.workspaces.filter(workspace => workspace !== workspacename);

    await foundUser.save();

    return res.status(200).json({ message: "Workspace removed successfully.", workspaces: foundUser.workspaces });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

