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
    coverImg: {
        type: String,
        required: false,
    },
    carImgs: [
        {
            type: String,
            required: false,
        },
    ],
    docs: [
        {
            type: String,
            required: false,
        },
    ],
    seller: {
        uid: {type: String, required: true},
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, required: true },
        telephone: { type: String, required: true }
    }
});

const Car = model("Car", carSchema);

export default Car;