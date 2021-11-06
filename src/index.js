import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

import setupRoutes from "./routes/route";

const start = async () => {
  try {
    // Connect to DB
    await mongoose.connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to DB, Let's Create an app!");
    const app = express();

    app.use(cors());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    console.log("App is created, Let's Setup Routes!");
    setupRoutes(app);

    const port = process.env.PORT || 4000;
    console.log(`App Routes is added, let's listen in port ${port}!`);
    app.listen(port);
  } catch (error) {
    console.error(error);
  }
};

start();
