import Car from "../models/carModel.js";

export const sell = async (req, res) => {
    try {
        const { carBrand, carModel, carLicense, carYear, carMileage, carTransmission, carCondition, carExteriorColour, carInteriorColour, carFuelType, carPrice, carSellerNotes } = req.body;
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
            carSellerNotes
        });

        const createdCar = await Car.create(newCar);
        console.log(createdCar);
        return res.status(201).send("Car created succesfully.");

    } catch (error) {
        console.log(error);
        return res.status(500).send("Internal Server Error");
    }
}