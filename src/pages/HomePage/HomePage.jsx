import { useState, useEffect } from "react";
import MovieDetailsPage from "../MovieDetailsPage/MovieDetailsPage";
import { fetchTrendingMovies } from "../../films-api";
import css from "./HomePage.module.css";

import Navigation from "../../components/Navigation/Navigation";
import MovieList from "../../components/MovieList/MovieList";

export default function HomePage() {
  const [trendingMovies, setTrendingMovies] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function getTrendingMovies() {
      try {
        setIsLoading(true);
        const response = await fetchTrendingMovies();
        setTrendingMovies(response.data.results);
      } catch (error) {
        console.log(error);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }

    getTrendingMovies();
  }, []);

  return (
    <>
      <Navigation />
      <h1>Trending today</h1>
      {error && <p>Oops! Something went wrong, please reload page!</p>}
      {isLoading && <p>Loading trending movies...</p>}
      {trendingMovies && !isLoading && <MovieList moviesList={trendingMovies} />}
    </>
  );
}

// <ul className={css.trendingMoviesList}>
 //       {trendingMovies.map((trendingMovie) => {
 //         return (
    //        <li key={trendingMovie.id}>
           //   {trendingMovie.original_title}
      //        {/* <MovieDetailsPage data="trendingMoviesList" /> */}
    //        </li>
     //     );
    //    })}
  //    </ul>
