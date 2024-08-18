const mongoose = require("mongoose");

const SocialMediaLinkSchema = new mongoose.Schema(
  {
    platform: { type: String, required: true },
    url: { type: String, required: true },
  },
  { _id: false } // Disable the _id field for this schema
);

const CreatorSchema = new mongoose.Schema({
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
  socialMediaLinks: { type: [SocialMediaLinkSchema] },
}, {
  versionKey: false,
});

module.exports = CreatorSchema;
