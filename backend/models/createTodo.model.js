const mongoose = require("mongoose");
const todoSchema = require("../schemas/todo.schema");

const TodoModel = mongoose.model("Todo", todoSchema);

module.exports = TodoModel;
