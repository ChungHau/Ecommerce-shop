import User from "../model/User.js";
import "express-async-errors";
import express from "express";
import path from "path";

export const createUser = async (req, res, next) => {
  // const { username, email, password } = req.body;
  // const userEmail = await User.findOne({ email });
  // if (userEmail) throw Error("User already exists");
  // console.log(req.file);
  console.log(req.file);
  // const user = {
  //   username,
  //   email,
  //   password,
  // };
  res.sendStatus(200);
  // console.log(user);
};
