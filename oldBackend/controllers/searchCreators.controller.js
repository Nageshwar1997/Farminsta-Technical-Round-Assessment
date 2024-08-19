const CreatorModel = require("../models/Creator.model");

const searchCreatorController = async (req, res) => {
  try {
    const { q, language, education, specialization } = req.query;

    const query = {};

    if (q) {
      const regex = new RegExp(q, "i");
      query.$or = [
        { name: regex },
        { email: regex },
        { specializations: regex },
      ];
    }

    if (language) {
      query.languages = { $in: [language] };
    }

    if (education) {
      query.education = education;
    }

    if (specialization) {
      query.specializations = { $in: [specialization] };
    }

    const creators = await CreatorModel.find(query);

    res.json({
      message: "Search Creators List",
      success: true,
      error: false,
      creators,
    });
  } catch (error) {
    res.json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};

module.exports = searchCreatorController;
