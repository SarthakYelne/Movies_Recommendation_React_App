const mongoose = require("mongoose");

const deleteMovie = async (req, res) => {
  const moviesModel = mongoose.model("movies");

  const movie_id = req.params.movie_id;

  const getmovie = moviesModel.findOne({
    _id: movie_id,
  });

  if (!getmovie) throw "This movie does not exist.";

  await moviesModel.deleteOne({
    _id: movie_id,
  });

  res.status(200).json({
    status: "success",
    message: "Movie deleted successfully",
  });
  return;
};

module.exports = deleteMovie;
