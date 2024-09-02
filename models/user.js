const { default: mongoose } = require("mongoose");

// create a new schema
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  name: String,
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
});

module.exports = mongoose.model("User", userSchema, "users");
