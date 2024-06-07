import { useEffect, useState } from "react";
import "./ListMovie.css"; // Import the CSS file for the component

function ListMovie() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Function to fetch movies from the API
    const fetchMovies = async () => {
      try {
        const response = await fetch("/api/movies");
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch movies");
        }

        if (!Array.isArray(data.data)) {
          throw new Error("Invalid data format");
        }

        setMovies(data.data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchMovies();

    // Set up polling
    const interval = setInterval(fetchMovies, 2000); // Poll every 5 seconds

    // Clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="list-container">
      <h1>Movies List</h1>
      <div className="counter">Total Movies: {movies.length}</div>
      {error && <div className="error">{error}</div>}
      <div>
        {movies.length === 0 ? (
          <p>No movies available</p>
        ) : (
          <ul className="movies-list">
            {movies.map((movie) => (
              <li key={movie.id} className="movie-item">
                <h2>{movie.movie_name}</h2>
                <p>{movie.info}</p>
                <p>Rating: {movie.rating}</p>
                <p>{movie.description}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default ListMovie;
