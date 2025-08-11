import express from "express";
import { sell, searchCar , getCars, getCarById, getRecentCars, getUsedCars, getListings, updateCar } from "../controllers/carsController.js";
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

// Search route
router.get("/search", searchCar);
router.get('/get', getCars);
router.get('/recent', getRecentCars);
router.get('/used-car', getUsedCars);
router.get('/listings', checkToken, getListings);



router.get('/:carId', getCarById);
router.put('/:carId', checkToken, upload.fields([
    { name: 'coverImg', maxCount: 1 },
    { name: 'carImgs', maxCount: 10 },
    { name: 'docs', maxCount: 6 }
]), updateCar);
export default router;