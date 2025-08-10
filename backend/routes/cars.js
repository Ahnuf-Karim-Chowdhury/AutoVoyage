import express from "express";
import { sell, searchCar , getCars, getCarById, getRecentCars, getUsedCars } from "../controllers/carsController.js";
import checkToken from "../middlewares/checkToken.js";
import upload from '../middlewares/multer.js';
import Car from '../models/carModel.js';



const router = express.Router();

router.route("/sell").get(checkToken, (req, res) => {
    res.status(200).send("User is authenticated.");
}).post(checkToken, upload.fields([
    { name: 'coverImg', maxCount: 1 },
    { name: 'carImgs', maxCount: 10 },
    { name: 'docs', maxCount: 6 }
]), sell);


// Search route
router.get("/search", searchCar);
router.get('/get', getCars);
router.get('/recent', getRecentCars);
router.get('/:carId', getCarById);
router.get('/used-car', getUsedCars);


export default router;