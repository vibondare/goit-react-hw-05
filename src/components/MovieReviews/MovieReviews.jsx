import { fetchReviews } from "../../films-api";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import css from "./MovieReviews.module.css";

export default function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function getActors() {
      try {
        setIsLoading(true);
        const response = await fetchReviews(movieId);
        setReviews(response);
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
      {reviews && reviews.length === 0 && !isLoading && <p>There are no reviews for this movie.</p> }
      {isLoading && <p>Loading reviews...</p>}
      {reviews && (
        <ul className={css.reviews}>
          {reviews.map((review) => (
            <li key={review.id}>
              <h2>Author: {review.author}</h2>
              <p>{review.content}</p>
              </li>
          ))}
        </ul>
      )}
    </>
  );
}
