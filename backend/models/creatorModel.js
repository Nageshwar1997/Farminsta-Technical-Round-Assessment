const mongoose = require("mongoose");
const creatorSchema = require("../schemas/creatorSchema");

const CreatorModel = mongoose.model("Creator", creatorSchema);

module.exports = CreatorModel;
