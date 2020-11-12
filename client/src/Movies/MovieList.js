import React from "react";
import { Link } from "react-router-dom";
import AddMovie from "./AddMovie";
import MovieCard from "./MovieCard";

function MovieList({ movies }) {
  
  return (
    <div className="movie-list">
       <Link to = {'/add-movie'}><button>Add Movie</button></Link>
      {
        movies.map(movie => (
          <Link key={movie.id} to={`/movies/${movie.id}`}>
            <MovieCard movie={movie} />
          </Link>
        ))
      }
    </div>
  );
}

export default MovieList;
