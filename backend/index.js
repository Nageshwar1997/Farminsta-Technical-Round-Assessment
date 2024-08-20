require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const CreatorModel = require("./models/creatorModel");

const app = express();
app.use(
  cors({
    origin: "https://farminsta-technical-round-assessment-frontend.vercel.app",
    methods: ["GET", "POST", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  return res.send("Welcome to Home Page");
});

app.post("/add_creator", async (req, res) => {
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
});

app.get("/creators", async (req, res) => {
  try {
    const creators = await CreatorModel.find();
    res.status(200).json({
      message: "Creators fetched successfully",
      success: true,
      error: false,
      creators: creators,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Something went wrong",
      success: false,
      error: true,
    });
  }
});

app.get("/creator/:id", async (req, res) => {
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
});

app.get("/search", async (req, res) => {
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
      // query.languages = { $in: [language] };
      query.languages = { $elemMatch: { $regex: new RegExp(language, "i") } };
    }

    if (education) {
      // query.education = education;
      if (education) {
        query.education = { $regex: new RegExp(education, "i") };
      }
    }

    if (specialization) {
      // query.specializations = { $in: [specialization] };
      query.specializations = {
        $elemMatch: { $regex: new RegExp(specialization, "i") },
      };
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
});

app.patch("/update_creator/:id", async (req, res) => {
  try {
    const { id } = req.params;

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

    const creator = await CreatorModel.findByIdAndUpdate(
      id,
      {
        name,
        email,
        education,
        bannerImageUrl,
        description,
        languages,
        socialMediaLinks,
        specializations,
      },
      {
        new: true,
      }
    );

    if (!creator) {
      return res.status(404).json({
        message: "Creator not found",
        success: false,
        error: true,
      });
    }

    res.status(200).json({
      message: "Creator updated successfully",
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
});

const PORT = process.env.PORT || 5000;
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Hello Nageshwar You are Connected to MongoDB");
    console.log("Server is running on port", PORT);
  });
});
