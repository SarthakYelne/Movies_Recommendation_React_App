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

//  import { useState } from "react";
// import PropTypes from "prop-types";

// import "./ListMovie.css";

// function ListMovie({ movies, onDelete }) {
//   const [suggestions, setSuggestions] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const fetchSuggestions = async () => {
//     setLoading(true);
//     setSuggestions([]);
//     try {
//       const response = await fetch("/api/movies/openai/movieRecommendation");
//       const data = await response.json();
//       setTimeout(() => {
//         if (response.ok) {
//           setSuggestions(data.recommendations);
//         } else {
//           console.error("Failed to fetch suggestions");
//         }
//         setLoading(false);
//       }, 1000); // Delay of 1 second
//     } catch (error) {
//       console.error("Error fetching suggestions:", error);
//       setLoading(false);
//     }
//   };

//   return (
//       <div className="list-container">
//      <h1>Movies List</h1>
//     <div className="counter">Total Movies: {movies.length}</div>
//        {movies.length === 0 ? (
//         <p>No movies available</p>
//       ) : (
//         <ul className="movies-list">
//           {movies.map((movie) => (
//             <li key={movie._id} className="movie-item">
//               <h2>{movie.movie_name}</h2>
//               <p>{movie.info}</p>
//               <p>Rating: {movie.rating}</p>
//               <p>{movie.description}</p>
//               <button
//                 className="btn btn-danger"
//                 onClick={() => onDelete(movie._id)}
//               >
//                 Delete
//               </button>
//             </li>
//           ))}
//         </ul>
//       )}
//       <button className="btn btn-primary" onClick={fetchSuggestions} disabled={loading}>
//         {loading ? "Loading..." : "Get Suggestions"}
//       </button>
//       {suggestions.length > 0 && (
//         <div className="suggestions-container">
//           <h2>Suggestions</h2>
//           <ul className="suggestions-list">
//             {suggestions.map((suggestion, index) => (
//               <li key={index} className="suggestion-item">
//                 <h3>{suggestion.title}</h3>
//                 <p>{suggestion.description}</p>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// }
// ListMovie.propTypes = {
//   movies: PropTypes.array.isRequired,
//   onDelete: PropTypes.func.isRequired,
// };

// export default ListMovie;
