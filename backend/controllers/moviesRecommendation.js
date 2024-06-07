const mongoose = require("mongoose");

const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const moviesRecommendation = async (req, res) => {
  const moviesModel = mongoose.model("movies");

  // Access your API key as an environment variable (see "Set up your API key" above)
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);

  const allMovies = await moviesModel.find({});

  const moviesString = allMovies.map((el) => el.movie_name).join(", ");

  const query = `I need a movie recommendation based on these movies : ${moviesString}.
   With little info also Provide me with 10 suggestions! `;

  // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = query;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  console.log(text);

  res.status(200).json({
    status: "success",
  });
};

module.exports = moviesRecommendation;
