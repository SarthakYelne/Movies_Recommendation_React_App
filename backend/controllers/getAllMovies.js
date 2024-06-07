const mongoose = require("mongoose");

const getAllMovies = async (req, res) => {
  const moviesModel = mongoose.model("movies");

  const moviesdata = await moviesModel.find({});

  res.status(200).json({
    message: "success",
    data: moviesdata,
  });
};

module.exports = getAllMovies;
