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
        };

        let carImgsUrls = [];
        if (req.files.carImgs) {
          for (const file of req.files.carImgs) {
            const carImgResult = await cloudinary.uploader.upload(file.path, { folder: 'car_images' });
            carImgsUrls.push(carImgResult.secure_url);
            fs.unlinkSync(file.path);
          }
        };

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
  const searchQuery = req.query.query;

  console.log("Search query received:", searchQuery);

  if (!searchQuery || searchQuery.trim() === "") {
      return res.status(400).json({ message: "Search query cannot be empty." });
  }

  try {
      const cars = await Car.find({
          $or: [
              { carBrand: { $regex: searchQuery, $options: "i" } },
              { carModel: { $regex: searchQuery, $options: "i" } }
          ]
      });

      console.log("Cars found:", cars.length);

      if (cars.length > 0) {
          return res.json({ found: true, cars });
      } else {
          return res.json({ found: false });
      }
  } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
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