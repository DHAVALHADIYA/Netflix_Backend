const mongoose = require("mongoose");

const favouritesSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  movie: {
    type: Array,
  },
});

module.exports = mongoose.model("favourites", favouritesSchema);
