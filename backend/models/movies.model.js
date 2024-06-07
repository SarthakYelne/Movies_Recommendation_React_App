const mongoose = require("mongoose");

const moviesSchema = new mongoose.Schema({
  movie_name: {
    type: String,
    required: [true, "Movie name is required"],
  },
  info: {
    type: String,
  },
  rating: {
    type: Number,
  },
});

const moviesModel = mongoose.model("movies", moviesSchema);

module.exports = moviesModel;
