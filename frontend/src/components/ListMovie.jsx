//  import { useState } from "react";
import PropTypes from "prop-types";
import "./ListMovie.css";

function ListMovie({ movies, onDelete }) {
  return (
    <div className="list-container">
      <h1>Movies List</h1>
      <div className="counter">Total Movies: {movies.length}</div>
      {movies.length === 0 ? (
        <p>No movies available</p>
      ) : (
        <ul className="movies-list">
          {movies.map((movie) => (
            <li key={movie._id} className="movie-item">
              <h2>{movie.movie_name}</h2>
              <p>{movie.info}</p>
              <p>Rating: {movie.rating}</p>
              <p>{movie.description}</p>
              <button
                className="btn btn-danger"
                onClick={() => onDelete(movie._id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

ListMovie.propTypes = {
  movies: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ListMovie;
