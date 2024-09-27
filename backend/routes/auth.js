import express from 'express';
import { register, login, logout, getProfile, updateProfile } from "../controllers/authController.js";
import checkToken from "../middlewares/checkToken.js";
import upload from '../middlewares/multer.js';


const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").post(checkToken, logout);
router.route("/profile")
  .get(checkToken, getProfile)
  .put(checkToken, upload.single('profilePicture'), updateProfile);


export default router;
