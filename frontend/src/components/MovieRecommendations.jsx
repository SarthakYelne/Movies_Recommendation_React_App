import { useState } from "react";
import "./MovieRecommendations.css";

function MovieRecommendations() {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchRecommendations = async () => {
    setLoading(true);
    setRecommendations([]);

    try {
      const response = await fetch(
        "https://movies-recommendation-react-app.onrender.com/api/movies/gemini/movieRecommendation"
      );
      const data = await response.json();
      setTimeout(() => {
        if (response.ok) {
          setRecommendations(data.data.recommendations);
        } else {
          console.error("Failed to fetch recommendations:", data.message);
        }
        setLoading(false);
      }, 1000); // Delay of 1 second
    } catch (error) {
      console.error("Error fetching recommendations:", error);
      setLoading(false);
    }
  };

  return (
    <div className="recommendations-container">
      <button
        className="btn btn-primary"
        onClick={fetchRecommendations}
        disabled={loading}
      >
        {loading ? "Loading..." : "Get Suggestions"}
      </button>
      {recommendations.length > 0 && (
        <div className="recommendations-list">
          <div className="header">
            <h2>Recommended Movies</h2>
          </div>
          <ul>
            {recommendations.map((recommendation, index) => (
              <li key={index} className="recommendation-item">
                <h3>{recommendation.title}</h3>
                <p>{recommendation.description}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default MovieRecommendations;
