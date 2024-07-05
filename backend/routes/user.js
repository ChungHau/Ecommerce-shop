import express from "express";
import { activateUser, createUser, getUser, loginUser } from "../controller/user.js";
import catchAsyncErrors from '../middleware/catchAsyncErrors.js'
import { isAuthenticated } from "../middleware/auth.js";
const router = express.Router();

router.post("/create-user", catchAsyncErrors(createUser));
router.post("/activation", catchAsyncErrors(activateUser));
router.post("/login-user", catchAsyncErrors(loginUser));
router.post("/get-user", catchAsyncErrors(isAuthenticated), );

export default router;
