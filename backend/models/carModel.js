import { Schema, model } from "mongoose";

const carSchema = new Schema({
    carBrand: {
        type: String,
        required: true,
    },
    carModel: {
        type: String,
        required: true,
    },
    carLicense: {
        type: String,
        required: true,
    },
    carYear: {
        type: String,
        required: true,
    },
    carMileage: {
        type: Number,
        required: true,
    },
    carTransmission: {
        type: String,
        required: true,
    },
    carCondition: {
        type: String,
        required: true,
    },
    carExteriorColour: {
        type: String,
        required: true,
    },
    carInteriorColour: {
        type: String,
        required: true,
    },
    carFuelType: {
        type: String,
        required: true,
    },
    carPrice: {
        type: Number,
        required: true,
    },
    carSellerNotes: {
        type: String,
        required: false,
    },  
});

const Car = model("Car", carSchema);

export default Car;