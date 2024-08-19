const CreatorModel = require("../models/Creator.model");

const addCreatorController = async (req, res) => {
  try {
    const {
      name,
      email,
      education,
      bannerImageUrl,
      description,
      languages,
      socialMediaLinks,
      specializations,
    } = req.body;

    if (!bannerImageUrl) {
      return res.status(201).json({
        message: "Banner image URL is required",
        success: false,
        error: true,
      });
    }

    if (!name) {
      return res.status(201).json({
        message: "Name is required",
        success: false,
        error: true,
      });
    }

    if (!email) {
      return res.status(201).json({
        message: "Email is required",
        success: false,
        error: true,
      });
    }

    if (email) {
      const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (!regex.test(email)) {
        return res.status(201).json({
          message: "Invalid email",
          success: false,
          error: true,
        });
      }
    }

    if (!description) {
      return res.status(201).json({
        message: "Description is required",
        success: false,
        error: true,
      });
    }

    if (languages.length < 1 || !languages) {
      return res.status(201).json({
        message: "Languages are required",
        success: false,
        error: true,
      });
    }

    if (socialMediaLinks.length < 1 || !socialMediaLinks) {
      return res.status(201).json({
        message: "Social media links are required",
        success: false,
        error: true,
      });
    }

    if (socialMediaLinks.length >= 1) {
      if (!socialMediaLinks[0].platform) {
        return res.status(201).json({
          message: "Platform is required",
          success: false,
          error: true,
        });
      }

      if (!socialMediaLinks[0].url) {
        return res.status(201).json({
          message: "URL is required",
          success: false,
          error: true,
        });
      }
    }

    if (!education) {
      return res.status(201).json({
        message: "Education is required",
        success: false,
        error: true,
      });
    }

    if (specializations.length < 1 || !specializations) {
      return res.status(201).json({
        message: "Specializations are required",
        success: false,
        error: true,
      });
    }

    const creator = new CreatorModel({
      name,
      email: email.toLowerCase(),
      education,
      bannerImageUrl,
      description,
      languages,
      socialMediaLinks,
      specializations,
    });

    console.log("creator", creator);

    await creator.save();

    res.status(201).json({
      message: "Creator added successfully",
      success: true,
      error: false,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Something went wrong",
      success: false,
      error: true,
    });
  }
};

module.exports = addCreatorController;