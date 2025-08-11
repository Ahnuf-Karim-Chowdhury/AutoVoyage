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


export const updateCar = async (req, res) => {
  try {
    const carId = req.params.carId;
    const userId = req.user.id;

    // Find the car and check if it exists
    const car = await Car.findById(carId);
    if (!car) {
      return res.status(404).send("Car not found");
    }

    // Check if the current user is the seller
    if (car.seller.uid !== userId) {
      return res.status(403).send("Not authorized to update this listing");
    }

    // Handle file uploads
    let updates = { ...req.body };
    delete updates.seller;

    // Handle cover image
    if(req.files) {
      if (req.files.coverImg) {
        // Delete old cover image from Cloudinary if it exists
        if (car.coverImg) {
          const publicId = car.coverImg.split('/').pop().split('.')[0];
          await cloudinary.uploader.destroy(`car_images/${publicId}`);
          console.log("Deleted cover img from cloudinary");
        }
        
        const coverImg = req.files.coverImg[0];
        const coverResult = await cloudinary.uploader.upload(coverImg.path, { folder: 'car_images' });
        updates.coverImg = coverResult.secure_url;
        fs.unlinkSync(coverImg.path);
      }

      // Handle additional car images
      if (req.files.carImgs) {
        // Delete old images from Cloudinary
        for (const imgUrl of car.carImgs) {
          const publicId = imgUrl.split('/').pop().split('.')[0];
          await cloudinary.uploader.destroy(`car_images/${publicId}`);
        }

        const carImgsUrls = [];
        for (const file of req.files.carImgs) {
          const carImgResult = await cloudinary.uploader.upload(file.path, { folder: 'car_images' });
          carImgsUrls.push(carImgResult.secure_url);
          fs.unlinkSync(file.path);
        }
        updates.carImgs = carImgsUrls;
      }

      // Handle documents
      if (req.files.docs) {
        // Delete old docs from Cloudinary
        for (const docUrl of car.docs) {
          const publicId = docUrl.split('/').pop().split('.')[0];
          await cloudinary.uploader.destroy(`car_docs/${publicId}`);
        }

        const docsUrls = [];
        for (const file of req.files.docs) {
          const docResult = await cloudinary.uploader.upload(file.path, { folder: 'car_docs' });
          docsUrls.push(docResult.secure_url);
          fs.unlinkSync(file.path);
        }
        updates.docs = docsUrls;
      }
    }

    // Update the car
    const updatedCar = await Car.findByIdAndUpdate(
      carId,
      { $set: updates },
      { new: true }
    );

    res.status(200).json(updatedCar);
  } catch (error) {
    console.error("Error updating car:", error);
    res.status(500).send("Internal Server Error");
  }
};


export const deleteCar = async (req, res) => {
  try {
    const carId = req.params.carId;
    const userId = req.user.id;

    // Find the car and check if it exists
    const car = await Car.findById(carId);
    if (!car) {
      return res.status(404).send("Car not found");
    }

    // Check if the current user is the seller
    if (car.seller.uid !== userId) {
      return res.status(403).send("Not authorized to delete this listing");
    }

    // Delete cover image from Cloudinary
    if (car.coverImg) {
      const publicId = car.coverImg.split('/').pop().split('.')[0];
      await cloudinary.uploader.destroy(`car_images/${publicId}`);
    }

    // Delete car images from Cloudinary
    if (car.carImgs && car.carImgs.length > 0) {
      for (const imgUrl of car.carImgs) {
        const publicId = imgUrl.split('/').pop().split('.')[0];
        await cloudinary.uploader.destroy(`car_images/${publicId}`);
      }
    }

    // Delete documents from Cloudinary
    if (car.docs && car.docs.length > 0) {
      for (const docUrl of car.docs) {
        const publicId = docUrl.split('/').pop().split('.')[0];
        await cloudinary.uploader.destroy(`car_docs/${publicId}`);
      }
    }

    // Delete the car from database
    await Car.findByIdAndDelete(carId);

    res.status(200).send("Car listing deleted successfully");
  } catch (error) {
    console.error("Error deleting car:", error);
    res.status(500).send("Internal Server Error");
  }
};