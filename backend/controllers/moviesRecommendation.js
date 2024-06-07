// const mongoose = require("mongoose");

// const { GoogleGenerativeAI } = require("@google/generative-ai");
// require("dotenv").config();

// const moviesRecommendation = async (req, res) => {
//   const moviesModel = mongoose.model("movies");

//   // Access your API key as an environment variable (see "Set up your API key" above)
//   const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);

//   const allMovies = await moviesModel.find({});

//   console.log(allMovies);

//   if (allMovies.length >= 2) {
//     const moviesString = allMovies.map((el) => el.movie_name).join(", ");

//     const query = `I need a movie recommendation based on these movies : ${moviesString}.
//    With little info also Provide me with 10 suggestions! `;

//     // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts

//     const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

//     const prompt = query;

//     const result = await model.generateContent(prompt);
//     const response = await result.response;
//     const text = response.text();
//     console.log(text);

//     res.status(200).json({
//       status: "success",
//       recommendations: text,
//     });
//   } else {
//     console.log("Waiting for more movies name.");
//     res.status(400).json({
//       status: error,
//       message: "Not enough movies to get recommendation",
//     });
//   }
// };

// module.exports = moviesRecommendation;


const mongoose = require("mongoose");
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const moviesRecommendation = async (req, res) => {
  const moviesModel = mongoose.model("movies");
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);

  // Function to check if there are at least 2 movies in the database
  const checkMoviesCount = async () => {
    const allMovies = await moviesModel.find({});
    return allMovies.length >= 2;
  };

  // Polling function to wait until there are at least 2 movies
  const waitForMovies = async () => {
    while (!(await checkMoviesCount())) {
      console.log("Waiting for at least 2 movie names in allMovies...");
      await new Promise(resolve => setTimeout(resolve, 5000)); // Wait for 5 seconds before checking again
    }
  };

  // Wait until there are at least 2 movies
  await waitForMovies();

  // Fetch all movies again after the condition is met
  const allMovies = await moviesModel.find({});
  const moviesString = allMovies.map((el) => el.movie_name).join(", ");
  
  const query = `I need a movie recommendation based on these movies: ${moviesString}.
    With little info also provide me with 10 suggestions!`;

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const result = await model.generateContent(query);
  const response = await result.response;
  const text = response.text();
  console.log(text);

  res.status(200).json({
    status: "success",
    recommendations: text,
  });
};

module.exports = moviesRecommendation;
