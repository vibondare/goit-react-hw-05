import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import { fetchDetails } from "../../films-api";
import { useEffect, useState } from "react";
import css from "./MovieDetailsPage.module.css";

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [error, setError] = useState(false);
  const location = useLocation();
  const backLinkHref = location.state ?? "/movies";

  useEffect(() => {
    async function getMovieDetails() {
      try {
        const response = await fetchDetails(movieId);
        setMovieDetails(response);
      } catch (error) {
        setError(true);
        console.log(error);
      }
    }

    getMovieDetails();
  }, [movieId]);


  return (
    <>
      <Link to={backLinkHref}>Go back</Link>
      {error && <p>Oops! Something went wrong, please reload page!</p>}
      {movieDetails && (
        <div className={css.movieDetailsContainer}>
          <div className={css.movieBasicDetailsContainer}>
            <img
              src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
              alt="Movie poster"
            />
            <div>
              <h1>{movieDetails.title}</h1>
              <p>User score: {Math.floor(movieDetails.vote_average * 10)}%</p>
              <h2>Overview</h2>
              <p>{movieDetails.overview}</p>
              <h2>Genres</h2>
              <ul className={css.genresList}>
                {movieDetails.genres.map((genre, i) => (
                  <li key={i}>{genre.name}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className={css.castAndReviewsLinks}>
            <Link to='cast' state={location}>Cast</Link>
            <Link to='reviews' state={location}>Reviews</Link>
          </div>
          <Outlet />
        </div>
      )}
    </>
  );
}
