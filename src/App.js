import React, { useState } from "react";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [movieId, setMovieId] = useState("");
  const [singleMovie, setSingleMovie] = useState(null);

  async function loadMovies() {
    const res = await fetch("/api/movies");
    const data = await res.json();
    setMovies(data.data || data);
    setSingleMovie(null);
  }

  async function searchMovie() {
    const res = await fetch("/api/movies/" + movieId);

    if (res.ok) {
      const data = await res.json();
      setSingleMovie(data);
      setMovies([]);
    } else {
      alert("Movie not found");
    }
  }

  return (
    <div className="container">
      <h1 className="title">Movie Dashboard</h1>

      <div className="controls">
        <button className="btn" onClick={loadMovies}>
          Show Movie List
        </button>

        <input
          className="input"
          value={movieId}
          onChange={(e) => setMovieId(e.target.value)}
          placeholder="Enter Movie ID"
        />

        <button className="btn search" onClick={searchMovie}>
          Search
        </button>
      </div>

      <div className="grid">
        {movies.map((movie) => (
          <div key={movie.id} className="card">
            <h3>{movie.title}</h3>
            <p>{movie.tagline}</p>
            <p>{movie.vote_average}/10</p>
          </div>
        ))}
      </div>

      {singleMovie && (
        <div className="single">
          <h2>{singleMovie.title}</h2>
          <p>{singleMovie.overview}</p>
          <p> {singleMovie.vote_average}/10</p>
          <p>{singleMovie.release_date}</p>
          <p>{singleMovie.runtime}</p>
        </div>
      )}
    </div>
  );
}

export default App;