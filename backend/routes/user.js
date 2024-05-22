// import upload from "../middleware/multer.js";
import express from "express";
import { createUser } from "../controller/user.js";
import upload from "../middleware/multer.js";
const router = express.Router();

router.post("/create-user", upload.single("avatar"), createUser);

export default router;
