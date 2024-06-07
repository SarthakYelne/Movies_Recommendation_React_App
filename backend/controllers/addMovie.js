const mongoose = require("mongoose");

const addMovie = async (req, res) => {
  const { movie_name, info, rating, description } = req.body;
  const moviesModel = mongoose.model("movies");

  if (!movie_name) throw "Movie name is required field";
  if (!info) throw "Info is required field";
  if (!rating) throw "Rating is required field";
  if (rating < 1 || rating > 10) throw "Rating range should be between 1-10";

  const createdMovie = await moviesModel.create({
    movie_name: movie_name,
    info: info,
    rating: rating,
    description: description,
  });

  res.status(200).json({
    status: "success",
    message: "Movie added successfully",
  });
};

module.exports = addMovie;
