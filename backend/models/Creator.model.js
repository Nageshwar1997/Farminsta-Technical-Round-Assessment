const mongoose = require("mongoose");
const CreatorSchema = require("../schemas/Creator.schema");

const CreatorModel = mongoose.model("Creator", CreatorSchema);

module.exports = CreatorModel;
