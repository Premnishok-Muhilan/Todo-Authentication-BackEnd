const mongoose = require("mongoose");

// create a schema
const todoSchema = new mongoose.Schema({
  description: String,
  status: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

// create a model and export it
module.exports = mongoose.model("Todo", todoSchema, "todos");
