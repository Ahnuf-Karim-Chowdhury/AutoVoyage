import Car from "../models/carModel.js";
import { getCurrentUser } from "../utils/userHelpers.js"
import cloudinary from '../cloudinaryConfig.js';
import fs from 'fs';

export const sell = async (req, res) => {
    try {
        const user = await getCurrentUser(req);
        const { carBrand, carModel, carLicense, carYear, carMileage, carTransmission, carCondition, carExteriorColour, carInteriorColour, carFuelType, carPrice, carSellerNotes } = req.body;

        let coverImgUrl = "";
        if (req.files.coverImg) {
          const coverImg = req.files.coverImg[0];
          const coverResult = await cloudinary.uploader.upload(coverImg.path, { folder: 'car_images' });
          coverImgUrl = coverResult.secure_url;
          fs.unlinkSync(coverImg.path);
        }

        let carImgsUrls = [];
        if (req.files.carImgs) {
          for (const file of req.files.carImgs) {
            const carImgResult = await cloudinary.uploader.upload(file.path, { folder: 'car_images' });
            carImgsUrls.push(carImgResult.secure_url);
            fs.unlinkSync(file.path);
          }
        }

        let docsUrls = [];
        if (req.files.docs) {
          for (const file of req.files.docs) {
            const docResult = await cloudinary.uploader.upload(file.path, { folder: 'car_docs' });
            docsUrls.push(docResult.secure_url);
            fs.unlinkSync(file.path);
          }
        }

        const newCar = new Car({
            carBrand,
            carModel,
            carLicense,
            carYear,
            carMileage,
            carTransmission,
            carCondition,
            carExteriorColour,
            carInteriorColour,
            carFuelType,
            carPrice,
            carSellerNotes,
            coverImg: coverImgUrl,
            carImgs: carImgsUrls,
            docs: docsUrls,
            seller: {
                uid: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                telephone: user.telephone
            }
        });

        const createdCar = await Car.create(newCar);
        console.log("Car created successfully!");
        return res.status(201).send(createdCar);

    } catch (error) {
        console.log(error);
        return res.status(500).send("Internal Server Error");
    }
};

// Search for cars
export const searchCar = async (req, res) => {
  try {
    const query = req.query.query.toLowerCase();
    const foundCars = await Car.find({
      $or: [
        { carBrand: { $regex: query, $options: "i" } }, // Case-insensitive search
        { carModel: { $regex: query, $options: "i" } }
      ]
    });

    if (foundCars.length > 0) {
      return res.json({ found: true, cars: foundCars });
    } else {
      return res.json({ found: false, message: "No cars found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error searching for cars" });
  }
};




export const getCars = async (req, res) => {
  try {
    const cars = await Car.find();
    res.status(200).send(cars);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching car data");
  }
};

export const getCarById = async (req, res) => {
  try {
    const carId = req.params.carId; 
    const car = await Car.findById(carId);

    if (!car) {
      return res.status(404).send("Car not found");
    }

    res.status(200).json(car);
  } catch (error) {
    console.error("Error fetching car details:", error);
    res.status(500).send("Internal Server Error");
  }
}

export const getRecentCars = async (req, res) => {
  const limit = 3;
  try {
    const recentCars = await Car.find().sort({ _id: -1 }).limit(limit);
    console.log(recentCars);
    res.status(200).json(recentCars);
  } catch (error) {
    res.status(500).send("Error fetching recent cars");
  }
};

export const getUsedCars = async (req, res) => {
  try {
    const usedCars = await Car.find({ carCondition: "Used" });
    console.log("Used cars fetched:", usedCars.length);
    res.status(200).json(usedCars);
  } catch (error) {
    console.error("Error in getUsedCars:", error);
    res.status(500).send("Internal Server Error");
  }
};


export const getListings = async (req, res) => {
  try {
    const userId = req.user.id; 
    const cars = await Car.find({ "seller.uid": userId });
    if (!cars || cars.length === 0) {
      return res.status(404).send("No listings found");
    }
    res.status(200).json(cars);
  } catch (error) {
    console.error("Error fetching car listings:", error);
    res.status(500).send("Internal Server Error");
  }
};
