import express from "express";
import asyncHandler from "express-async-handler";
import { onlyAuthorized } from "./middlewares/onlyAuthorized";
import { getUserData, loginUser, registerUser } from "./user.controllers";
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Hello from user api !" });
});

router.post("/login", asyncHandler(loginUser));
router.post("/register", asyncHandler(registerUser));
router.post(
  "/get-user-data",
  asyncHandler(onlyAuthorized),
  asyncHandler(getUserData)
);

export default router;
