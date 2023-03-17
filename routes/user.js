import express from "express";

import {
  register,
  login,
  profile,
  logOut,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.post("/logout", logOut);

router.get("/profile", profile);

export default router;
