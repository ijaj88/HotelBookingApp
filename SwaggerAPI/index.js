import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import usersRoute from "./routes/users.js";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import hotelsroute from "./routes/hotels.js"
import authroute from "./routes/auth.js"
import cookieParser from "cookie-parser";
import roomroute from "./routes/rooms.js"
import cors from 'cors';

const app = express();




// Enable CORS
app.use(cors());
dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.mongo);
    console.log("Connected to MongoDB.");
  } catch (error) {
    throw error;
  }
};

// Swagger setup
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "User API",
      version: "1.0.0",
      description: "API documentation for managing user data",
    },
  },
  apis: ["./routes/*"],
  basePath:  "/",

};



app.use(cookieParser())
const specs = swaggerJsdoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));


app.use(express.json());
app.use("/api/auth",authroute)
app.use("/api/users", usersRoute);
app.use("/api/hotels",hotelsroute);
app.use("/api/rooms",roomroute);
// Start the server
app.listen(8000, () => {
  connect();
  console.log("Backend connected");
});
