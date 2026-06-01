import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    fetch(`/api/movies/${id}`)
      .then(res => res.json())
      .then(data => setMovie(data));
  }, [id]);

  if (!movie) return <p>Loading...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>{movie.title}</h1>

      <p>{movie.overview}</p>

      <p>
        <b>Release Date:</b>{" "}
        {new Date(movie.release_date).toLocaleDateString()}
      </p>

      <p>
        <b>Runtime:</b> {movie.runtime} minutes
      </p>

      <p>
        <b>Rating:</b> {movie.vote_average}/10
      </p>

      <button onClick={() => navigate("/")}>
        Back to Movies
      </button>
    </div>
  );
}