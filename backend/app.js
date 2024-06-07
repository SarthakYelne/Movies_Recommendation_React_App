require("express-async-errors");

const express = require("express");

const mongoose = require("mongoose");

const addMovie = require("./controllers/addMovie");
const getAllMovies = require("./controllers/getAllMovies");
const getSingleMovie = require("./controllers/getSingleMovie");
const { findOneAndUpdate } = require("./models/movies.model");
const editMovies = require("./controllers/editMovie");
const deleteMovie = require("./controllers/deleteMovie");
const moviesRecommendation = require("./controllers/moviesRecommendation");
const errorHandler = require("./handlers/errorHandler");

require("dotenv").config();

// Connection to mongodb...
mongoose
  .connect(process.env.mongodb_connection, {})
  .then(() => {
    console.log("Connection to mongodb successfull!");
  })
  .catch(() => {
    console.log("Connection to mongodb failed!");
  });

const app = express();
app.use(express.json());

// Models...
require("./models/movies.model");

// Routes...
app.post("/api/movies", addMovie);
app.get("/api/movies", getAllMovies);
app.get("/api/movies/:movie_id", getSingleMovie);
app.patch("/api/movies", editMovies);
app.delete("/api/movies/:movie_id", deleteMovie);

// OpenAI Suggestions
app.get("/api/movies/openai/movieRecommendation", moviesRecommendation);

// Handle errors...
app.use(errorHandler);

// localhost:8000 listning...
app.listen(8000, () => {
  console.log("Server started successfully!");
});
