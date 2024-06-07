import { useState } from "react";
import "./AddMovie.css"; // Import the CSS file for the component

function AddMovie() {
  const [movie, setMovie] = useState({
    movie_name: "",
    info: "",
    rating: "",
  });
  const [message, setMessage] = useState("");

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
        setMessage("Movie added successfully.");
        setMovie({ movie_name: "", info: "", rating: "" });
      } else {
        setMessage("Failed to add movie.");
      }
    } catch (error) {
      console.error("Error adding movie:", error);
      setMessage("Failed to add movie due to an error.");
    }
  };

  return (
    <div className="form">
      <h1>Add Movie</h1>
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
        {message && <div className="alert">{message}</div>}
      </form>
    </div>
  );
}

export default AddMovie;
