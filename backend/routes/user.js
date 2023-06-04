// const express = require("express");
import express from "express";
import "express-async-errors";
import upload from "../multer.js";
import { createUser } from "../controller/user.js";
const router = express.Router();

router.post("/create-user", upload.single("file"), createUser);

export default router;
