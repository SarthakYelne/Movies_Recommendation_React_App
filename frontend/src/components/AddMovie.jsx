import { useState } from "react";
import PropTypes from "prop-types";
import "./AddMovie.css";

function AddMovie({ onSave }) {
  const [movie, setMovie] = useState({
    movie_name: "",
    info: "",
    rating: "",
    description: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setMovie({
      ...movie,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("/api/movies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(movie),
      });

      if (response.ok) {
        onSave();
        setMovie({
          movie_name: "",
          info: "",
          rating: "",
          description: "",
        });
      } else {
        console.error("Failed to add movie");
      }
    } catch (error) {
      console.error("Error adding movie:", error);
    }
  };

  return (
    <div className="form">
      <h2>Add Movie</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Movie Name</label>
          <input
            type="text"
            name="movie_name"
            className="form-control"
            onChange={handleChange}
            value={movie.movie_name}
          />
        </div>
        <div className="mb-3">
          <label>Info</label>
          <input
            type="text"
            name="info"
            className="form-control"
            onChange={handleChange}
            value={movie.info}
          />
        </div>
        <div className="mb-3">
          <label>Rating</label>
          <input
            type="number"
            name="rating"
            className="form-control"
            onChange={handleChange}
            value={movie.rating}
          />
        </div>
        <div className="mb-3">
          <input type="submit" className="btn btn-primary" value="Add Movie" />
        </div>
      </form>
    </div>
  );
}

AddMovie.propTypes = {
  onSave: PropTypes.func.isRequired,
};

export default AddMovie;
