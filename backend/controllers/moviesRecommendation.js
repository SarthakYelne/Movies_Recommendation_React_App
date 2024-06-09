// const mongoose = require("mongoose");
// const { GoogleGenerativeAI } = require("@google/generative-ai");
// require("dotenv").config();

// const moviesRecommendation = async (req, res) => {
//   const moviesModel = mongoose.model("movies");
//   const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);

//   // Function to check if there are at least 2 movies in the database
//   const checkMoviesCount = async () => {
//     const allMovies = await moviesModel.find({});
//     return allMovies.length >= 2;
//   };

//   // Polling function to wait until there are at least 2 movies
//   const waitForMovies = async () => {
//     while (!(await checkMoviesCount())) {
//       console.log("Waiting for at least 2 movie names in allMovies...");
//       await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for 5 seconds before checking again
//     }
//   };

//   // Wait until there are at least 2 movies
//   await waitForMovies();

//   // Fetch all movies again after the condition is met
//   const allMovies = await moviesModel.find({});
//   const moviesString = allMovies.map((el) => el.movie_name).join(", ");

//   const query = `I need a movie recommendation based on these movies name: ${moviesString}.

//   List 5 popular cookie recipes.

//   Using this JSON schema:

//     Movies = {"movie_list": str}

//   Return a movies_data[Movies]
//   `;

//   model = genAI.GenerativeModel("gemini-1.5-flash", {
//     response_mime_type: "application/json",
//   });

//   const result = await model.generateContent(query);
//   const response = await result.response;
//   const text = response.text();
//   console.log(text);

//   res.status(200).json({
//     status: "success",
//     recommendations: text,
//   });
// };

// module.exports = moviesRecommendation;
// --------------------------------------------------------------------

const mongoose = require("mongoose");
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const moviesRecommendation = async (req, res) => {
  const moviesModel = mongoose.model("movies");
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);

  const allMovies = await moviesModel.find({});

  if (allMovies.length < 2) {
    res.status(400).json({
      status: "failed",
      message: "Atleast two movies required",
    });
    return;
  }
  // return allMovies.length >= 2;
  //
  const moviesString = allMovies.map((el) => el.movie_name).join(", ");

  // Step 2: Format the prompt for the AI model
  const query = `I need a movie recommendation based on these movies: ${moviesString}. With little info also provide me with 10 suggestions!. align data in points and description should be of one line only.`;

  await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for 5 seconds before checking again
  // Configure the AI model
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });

  // Generate the content using the AI model
  const result = await model.generateContent({
    contents: [{ parts: [{ text: query }] }],
    generationConfig: { response_mime_type: "application/json" },
  });

  const response = await result.response;

  // Handle the response
  let recommendations;
  try {
    recommendations = JSON.parse(response.text());
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Failed to parse AI response",
      error: error.message,
    });
  }
  console.log(recommendations);

  res.status(200).json({
    status: "success",
    recommendations: recommendations,
  });
};

module.exports = moviesRecommendation;
