import express from "express";
import mongoose from "mongoose";
import 'dotenv/config';

const app = express();

mongoose.connect(process.env.DB_URL)
.then(() => console.log("Database connected!"))
.catch((e) => console.log(`Error connecting to the database: ${e}`));

const port = 8080;

app.listen(port, () => {
    console.log(`Server listening on ${port}`);
})