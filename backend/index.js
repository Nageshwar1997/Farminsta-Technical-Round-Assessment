const express = require("express");
const cors = require("cors");
// const cookieParser = require("cookie-parser"); // currently not installed
require("dotenv").config();
const connectDB = require("./config/db");
const router = require("./routes/index");
const CreatorModel = require("./models/Creator.model");
const addCreatorController = require("./controllers/addCreator.controller");
const getAllCreatorsController = require("./controllers/getAllCreators.controller");
const getCurrentCreatorController = require("./controllers/getCurrentCreator.controller");
const updateCreatorController = require("./controllers/updateCreator.controller");

const app = express();
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());
// app.use(cookieParser()); // currently not installed

// routes
app.post("/add-creator", addCreatorController);
app.get("/all-creators", getAllCreatorsController);
app.get("/creators/:id", getCurrentCreatorController);
app.patch("/update-creator/:id", updateCreatorController);

const PORT = process.env.PORT || 5000;
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log("Server is Connected to MongoDB & running on port", PORT);
    });
  })
  .catch((error) => {
    console.log("Failed to connect to MongoDB", error);
  });
