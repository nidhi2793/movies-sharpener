import React, { useState } from "react";
import MoviesList from "./components/MoviesList";
import "./App.css";

let fetchMovieInterval = null;

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  async function fetchMoviesWithRetry() {
    fetchMovieInterval = setInterval(async () => {
      let response = await fetch("https://swapi.dev/api/film");
      if (response.ok) {
        clearInterval(fetchMovieInterval);
        setMovies((await response.json()).results);
        setIsLoading(false);
      }
    }, 5000);
  }

  async function fetchMoviesHandler() {
    setIsLoading(true);
    setError(null);
    try {
      let response = await fetch("https://swapi.dev/api/film");
      if (!response.ok) {
        fetchMoviesWithRetry();
        throw new Error("Retrying....");
      }
    } catch (error) {
      setError(error.message);
    }
  }

  function handleRetry() {
    clearInterval(fetchMovieInterval);

    setIsLoading(false);
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {isLoading && !error && <span>Loading....</span>}
        {isLoading && error && (
          <div>
            <p>{error}</p> <button onClick={handleRetry}>Cancel</button>{" "}
          </div>
        )}

        <MoviesList movies={movies} />
      </section>
    </React.Fragment>
  );
}

export default App;
