// const mongoose = require("mongoose");

// const editMovies = async (req, res) => {
//   const moviesModel = mongoose.model("movies");

//   const { movie_id, movie_name, info, rating, description } = req.body;

//   if (!movie_id) throw "Movie id is required.";

//   await moviesModel.updateOne(
//     {
//       _id: movie_id,
//     },
//     {
//       movie_name: movie_name,
//       info: info,
//       rating: rating,
//       description: description,
//     },
//     {
//       runValidators: true,
//     }
//   );

//   res.status(200).json({
//     status: "success",
//     message: "Movie updated successfully",
//   });
// };

// module.exports = editMovies;

const mongoose = require("mongoose");

const editMovies = async (req, res) => {
  const moviesModel = mongoose.model("movies");
  const { movie_id } = req.params;
  const { movie_name, info, rating, description } = req.body;

  if (!movie_id) {
    return res.status(400).json({ status: 'error', message: 'Movie id is required.' });
  }

  try {
    await moviesModel.updateOne(
      { _id: movie_id },
      { movie_name, info, rating, description },
      { runValidators: true }
    );

    res.status(200).json({
      status: "success",
      message: "Movie updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to update movie",
    });
  }
};

module.exports = editMovies;
