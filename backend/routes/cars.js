import express from "express";
import { sell } from "../controllers/carsController.js";
import checkToken from "../middlewares/checkToken.js";


const router = express.Router();

router.route("/sell").get(checkToken, (req, res) => {
    res.status(200).send("User is authenticated.");
}).post(checkToken, sell);

export default router;