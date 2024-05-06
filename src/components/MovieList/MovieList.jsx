import css from './MovieList.module.css'
import { Link, useLocation } from 'react-router-dom';

export default function MovieList({ moviesList }) {
  const location = useLocation();

    return (
      <>
        <ul className={css.moviesList}>
        {moviesList.map((movie) => {
          return (
            <li key={movie.id}>
              <Link to={`/movies/${movie.id}`} state={location}>{movie.title}</Link>
            </li>
          );
        })}
      </ul>
      </>
    );
  }