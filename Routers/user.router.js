import express from "express";
import {
    deleteUser,
  getregisterUser,
  loginUser,
  registerUser,
  updateUser,
} from "../Controllers/user.controller.js";
const router = express.Router();
router.post("/register", registerUser);
router.get("/getregister", getregisterUser);
router.post("/login/user", loginUser);
router.post("/updated/:id", updateUser);
router.delete("/delete/:id", deleteUser)
export default router;
