import User from "../model/User.js";
import "express-async-errors";
import express from "express";
import path from "path";


// create user
export const createUser = async (req, res, next) => {
  const { username, email, password } = req.body;
  const userEmail = await User.findOne({ email });
  
  if (userEmail) throw Error("User already exists");

  const avatar = req.file.filename
  const user = {
    username,
    email,
    password,
    avatar
  };
  console.log(user);

  res.sendStatus(200);
};
