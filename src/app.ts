// top level imports
import express from "express";
import { config } from "dotenv";
import cors from "cors";
import { connectDB } from "./db";

const app = express();
const PORT = process.env.BACKEND_EXPOSE_PORT;

// enabled all environment variables
config();

// server settings
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// importing all routers
import AuthRouter from "./routes/Auth";

// using all routers
app.use("/api/auth", AuthRouter);

// starting the server
const start = () => {
  try {
    // connecting to database
    connectDB();

    app.listen(BACKEND_EXPOSE_PORT, () => {
      console.log("Server started successfully");
    });
  } catch (err) {
    console.log(err);
  }
};

start();
