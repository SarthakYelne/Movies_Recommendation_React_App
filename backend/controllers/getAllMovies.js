const mongoose = require("mongoose");

const getAllMovies = async (req, res) => {
  const moviesModel = mongoose.model("movies");

  try {
    const moviesData = await moviesModel.find({});
    // console.log(moviesData);

    // Validate that the data is an array
    if (!Array.isArray(moviesData)) {
      throw new Error("Invalid data format: expected an array");
    }

    res.status(200).json({
      message: "success",
      data: moviesData,
    });
  } catch (error) {
    console.error("Error fetching movies:", error);

    res.status(500).json({
      message: "An error occurred while fetching movies",
      error: error.message,
    });
  }
};

module.exports = getAllMovies;
