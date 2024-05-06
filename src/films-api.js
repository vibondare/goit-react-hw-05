import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org/3/";
const authorizationKey =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NTgxNzYzMjdjN2IwODllMGQ1OTI2NmFiODkyNmQ5ZiIsInN1YiI6IjY2MzI2MzRjODEzY2I2MDEyOTg2NzA1ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xp-GATokwPBNL7iRUvFaH-efg753Rce7SsRzFkAZn2c";
// const url = "https://api.themoviedb.org/3/search/movie"

export const fetchSearchedFilms = async (searchQuery) => {
  const options = {
    params: {
      query: searchQuery,
    },
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${authorizationKey}`,
    },
  };
  const response = await axios.get("search/movie", options);
  return response.data.results;
};

export const fetchTrendingMovies = async () => {
  const options = {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${authorizationKey}`,
    },
  };
  const response = await axios.get("trending/movie/day", options);
  return response;
};

export const fetchDetails = async (filmId) => {
  const options = {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${authorizationKey}`,
    },
  };
  const response = await axios.get(`movie/${filmId}`, options);
  return response.data;
}

export const fetchActors = async (filmId) => {
  const options = {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${authorizationKey}`,
    },
  };
  const response = await axios.get(`movie/${filmId}/credits`, options);
  return response.data.cast;
}

export const fetchReviews = async (filmId) => {
  const options = {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${authorizationKey}`,
    },
  };
  const response = await axios.get(`movie/${filmId}/reviews`, options);
  return response.data.results;
}

