import User from "../model/User.js";

import express from "express";
import path from "path";
import upload from "../multer.js";
export const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  const userEmail = await User.findOne({ email });
  if (userEmail) throw Error("User already exists");

  const filename = req.file.filename;
  const fileUrl = path.join(filename);
  const user = {
    name,
    email,
    password,
    avatar: fileUrl,
  };

  console.log(user);
};
