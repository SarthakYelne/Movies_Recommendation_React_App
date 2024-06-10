const express = require("express");
require("express-async-errors");
const cors = require("cors");

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
app.use(
  cors({
    origin: [""],
    methods: ["POST", "GET", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
app.use(cors());

// Models...
require("./models/movies.model");

// Routes...
app.get("/", (req, res) => {
  res.json("deployed...");
});
app.post("/api/movies", addMovie);
app.get("/api/movies", getAllMovies);
app.get("/api/movies/:movie_id", getSingleMovie);
app.patch("/api/movies", editMovies);
app.delete("/api/movies/:movie_id", deleteMovie);

// OpenAI Suggestions
app.get("/api/movies/gemini/movieRecommendation", moviesRecommendation);

// Handle errors...
app.use(errorHandler);

const port = process.env.PORT || 8000;

// localhost:8000 listning...
app.listen(port, () => {
  console.log(`Server started successfully on : http://localhost:${port}`);
});
