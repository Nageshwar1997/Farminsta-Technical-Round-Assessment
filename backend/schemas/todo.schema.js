const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      default: "todos",
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = todoSchema;
