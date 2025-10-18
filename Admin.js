const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  userId: String,
  password: String
});

module.exports = mongoose.model("Admin", adminSchema);
