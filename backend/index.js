import express from "express";
import mongoose from "mongoose";
import 'dotenv/config';
import authRouter from "./routes/auth.js";

const app = express();

mongoose.connect(process.env.DB_URI)
.then(() => console.log("Database connected!"))
.catch((e) => console.log(`Error connecting to the database: ${e}`));


app.use(express.json());
//routes
app.get("/", (req, res) => res.json({ message: "API is working" }));
app.use('/auth', authRouter);

const port = 5001;

app.listen(port, () => {
    console.log(`Server listening on ${port}`);
})