import express from "express";
import { sell, getCars } from "../controllers/carsController.js";
import checkToken from "../middlewares/checkToken.js";
import upload from '../middlewares/multer.js';


const router = express.Router();

router.route("/sell").get(checkToken, (req, res) => {
    res.status(200).send("User is authenticated.");
}).post(checkToken, upload.fields([
    { name: 'coverImg', maxCount: 1 },
    { name: 'carImgs', maxCount: 10 },
    { name: 'docs', maxCount: 6 }
]), sell);

router.get('/get', getCars);

export default router;