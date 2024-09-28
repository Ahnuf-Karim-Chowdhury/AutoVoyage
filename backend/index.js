import express from "express";
import mongoose from "mongoose";
import 'dotenv/config';
import authRouter from "./routes/auth.js";
import carsRouter from "./routes/cars.js";
import cookieParser from "cookie-parser";
import cors from "cors";
/* import '@fortawesome/fontawesome-free/css/all.min.css'; */

const app = express();

mongoose.connect(process.env.DB_URI)
    .then(() => console.log("Database connected!"))
    .catch((e) => console.log(`Error connecting to the database: ${e}`));


app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true, origin: "http://localhost:5173", }));
//routes
app.get("/", (req, res) => res.json({ message: "API is working" }));
app.use('/auth', authRouter);
app.use('/cars', carsRouter);


const port = process.env.PORT || 5001;

app.listen(port, () => {
    console.log(`Server listening on ${port}`);
})


  
