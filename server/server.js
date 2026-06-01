const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();

const movies = JSON.parse(
  fs.readFileSync(path.join(__dirname, "movies_metadata.json"))
);

app.get("/api/movies", (req, res) => {
  res.json({ data: movies });
});

app.get("/api/movies/:id", (req, res) => {
  const movie = movies.find(m => m.id == req.params.id);

  if (!movie) {
    return res.status(404).json({ message: "Movie not found" });
  }

  res.json(movie);
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
