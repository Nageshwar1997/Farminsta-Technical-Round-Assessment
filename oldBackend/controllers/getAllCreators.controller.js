const CreatorModel = require("../models/Creator.model");

const getAllCreatorsController = async (req, res) => {
  try {
    const creators = await CreatorModel.find();

    res.status(200).json({
      message: "Creators fetched successfully",
      success: true,
      error: false,
      creators,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Something went wrong",
      success: false,
      error: true,
    });
  }
};

module.exports = getAllCreatorsController;