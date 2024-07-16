import express from "express";
import { sell } from "../controllers/carsController.js";


const router = express.Router();

router.route("/sell").post(sell);


export default router;