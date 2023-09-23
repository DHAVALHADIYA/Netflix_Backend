const mongoose = require("mongoose");

const OlduserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

module.exports = mongoose.model("OldUser", OlduserSchema);
