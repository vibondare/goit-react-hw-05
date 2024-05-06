import Navigation from "../../components/Navigation/Navigation";
import css from "./MoviesPage.module.css";
import { fetchSearchedFilms } from "../../films-api";
import { useState, useEffect } from "react";
import MovieList from "../../components/MovieList/MovieList";
import { useSearchParams } from "react-router-dom";

export default function MoviesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchedFilms, setSearchedFilms] = useState(null);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const urlQuery = searchParams.get("query") ?? "";
  
  const handleChange = (value) => {
    setSearchParams({ query: value });
  };

  const handleSearch = (newQuery) => {
    setQuery(newQuery);
    setSearchedFilms([]);
  };

  useEffect(() => {
    if (query.trim() === "") {
      return;
    }

    async function getFilms() {
      try {
        setIsLoading(true);
        const data = await fetchSearchedFilms(query);
        setSearchedFilms(data);
      } catch (error) {
        setError(true);
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }

    getFilms();
  }, [query]);

  return (
    <>
      <Navigation />
      <h1>Search for films:</h1>
      <form
        className={css.form}
        onSubmit={(event) => {
          event.preventDefault();
          const form = event.target;
          const searchQuery = form.elements.query.value;
          if (searchQuery.trim() === "") {
            return;
          }
          handleSearch(searchQuery);
        }}
      >
        <input
          type="text"
          className={css.input}
          name="query"
          value={urlQuery}
          onChange={(event) => {
            handleChange(event.target.value);
          }}
        />
        <button type="submit" className={css.button}>
          Search
        </button>
      </form>
      {error && <p>Oops! Something went wrong, please reload page!</p>}
      {isLoading && <p>Loading movies...</p>}
      {searchedFilms && !isLoading && <MovieList moviesList={searchedFilms} />}
    </>
  );
}
