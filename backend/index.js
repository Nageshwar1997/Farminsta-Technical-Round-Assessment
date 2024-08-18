const express = require("express");
const cors = require("cors");
// const cookieParser = require("cookie-parser"); // currently not installed
require("dotenv").config();
const connectDB = require("./config/db");
const router = require("./routes/index");
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
app.use("/api", router);

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  try {
    await connectDB();
    console.log("Server is Running on port", PORT);
  } catch (error) {
    console.log(
      `Server is Running & Failed to connect to MongoDB on port ${PORT} ${
        error.message || error
      }`
    );
  }
});
