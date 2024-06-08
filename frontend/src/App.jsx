import { useState, useEffect } from "react";
import ListMovie from "./components/ListMovie";
import AddMovie from "./components/AddMovie";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMovies();
  }, []);

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

  const handleSave = () => {
    fetchMovies(); // Refresh the movie list after save
  };

  const handleDelete = async (movieId) => {
    try {
      const response = await fetch(`/api/movies/${movieId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setMovies(movies.filter((movie) => movie._id !== movieId));
      } else {
        setError("Failed to delete movie");
      }
    } catch (error) {
      setError("Error deleting movie");
    }
  };

  return (
    <div className="app-container">
      <h1>Movies Recommendation App</h1>
      {error && <div className="error">{error}</div>}
      <AddMovie onSave={handleSave} />
      <ListMovie movies={movies} onDelete={handleDelete} />
    </div>
  );
}

export default App;
