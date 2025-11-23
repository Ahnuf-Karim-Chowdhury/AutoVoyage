import express from "express";
import mongoose from "mongoose";
import 'dotenv/config';
import authRouter from "./routes/auth.js";
import carsRouter from "./routes/cars.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const specs = require("./docs/swagger-output.json");

const app = express();

mongoose.connect(process.env.DB_URI)
  .then(() => console.log("Database connected!"))
  .catch((e) => console.log(`Error connecting to the database: ${e}`));

app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));

// Swagger docs (auto-generated)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Routes
app.get("/", (req, res) => res.json({ message: "API is working" }));
app.use('/auth', authRouter);
app.use('/cars', carsRouter);

const port = process.env.PORT || 6969;
app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
