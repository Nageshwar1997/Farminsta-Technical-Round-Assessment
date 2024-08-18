const express = require("express");
const addCreatorController = require("../controllers/addCreator.controller");
const getAllCreatorsController = require("../controllers/getAllCreators.controller");
const getCurrentCreatorController = require("../controllers/getCurrentCreator.controller");
const updateCreatorController = require("../controllers/updateCreator.controller");
const searchCreatorController = require("../controllers/searchCreators.controller");
const router = express.Router();

router.post("/add-creator", addCreatorController);
router.get("/all-creators", getAllCreatorsController);
router.get("/creators/:id", getCurrentCreatorController);
router.patch("/update-creator/:id", updateCreatorController);
router.get("/search", searchCreatorController);

module.exports = router;
