const CreatorModel = require("../models/Creator.model");

const getCurrentCreatorController = async (req, res) => {
  try {
    const { id } = req.params;
    const creator = await CreatorModel.findOne({ _id: id });

    if (!creator) {
      return res.status(404).json({
        message: "Creator not found",
        success: false,
        error: true,
      });
    }

    res.status(200).json({
      message: "Creator fetched successfully",
      success: true,
      error: false,
      creator,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Something went wrong",
      success: false,
      error: true,
    });
  }
};

module.exports = getCurrentCreatorController;