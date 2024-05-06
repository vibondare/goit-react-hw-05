import { fetchActors } from "../../films-api";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import css from "./MovieCast.module.css";

export default function MovieCast() {
  const { movieId } = useParams();
  const [actors, setActors] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function getActors() {
      try {
        setIsLoading(true);
        const response = await fetchActors(movieId);
        setActors(response);
      } catch (error) {
        console.log(error);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }

    getActors();
  }, [movieId]);

  return (
    <>
      {error && <p>Oops! Something went wrong, please reload page!</p>}
      {isLoading && <p>Loading cast info...</p>}
      {actors && (
        <ul className={css.actorsList}>
          {actors.map((actor) => (
            <li key={actor.id} className={css.actorsListItem}>
              <img
                src={`https://image.tmdb.org/t/p/w300${actor.profile_path}`}
                alt=""
              />
              <div className={css.actorText}>
                <p>Character: {actor.character}</p>
                <p>Name: {actor.name}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
