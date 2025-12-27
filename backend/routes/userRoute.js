import express from "express";

import {
  loginUser,
  registerUser,
  adminLogin,
  forgotPassword,
  resetPassword,
} from "../controllers/userController.js";

const userRouter = express.Router();

// User auth routes
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);

// Forgot / Reset password
userRouter.post("/forgot-password", forgotPassword);
userRouter.post("/reset-password/:token", resetPassword);

// Admin login
userRouter.post("/admin", adminLogin);

export default userRouter;
