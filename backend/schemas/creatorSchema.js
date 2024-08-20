const mongoose = require("mongoose");

const creatorSchema = new mongoose.Schema(
  {
    bannerImageUrl: {
      type: String,
      trim: true,
    },
    name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    languages: [String],
    education: {
      type: String,
      trim: true,
      default: "N/A",
    },
    specializations: [String],
    socialMediaLinks: [
      {
        platform: { type: String, required: true },
        url: { type: String, required: true },
        _id: false,
      },
    ],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = creatorSchema;
