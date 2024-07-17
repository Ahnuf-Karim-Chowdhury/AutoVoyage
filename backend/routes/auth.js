import express from "express";
import { register, login, logout } from "../controllers/authController.js";
import checkToken from "../middlewares/checkToken.js";

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").post(checkToken ,logout);


export default router;