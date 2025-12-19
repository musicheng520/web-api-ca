import fetch from "node-fetch";

const TMDB_BASE = "https://api.themoviedb.org/3";


export const getGenres = async () => {
  const response = await fetch(
    `${TMDB_BASE}/genre/movie/list?api_key=${process.env.TMDB_KEY}&language=en-US`
  );

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.status_message || "TMDB request failed");
  }

  return response.json();
};


export const getMovies = async ({ category = "discover", page = 1 } = {}) => {
  const url =
    category === "discover"
      ? `${TMDB_BASE}/discover/movie?api_key=${process.env.TMDB_KEY}&language=en-US&include_adult=false&include_video=false&page=${page}`
      : `${TMDB_BASE}/movie/${category}?api_key=${process.env.TMDB_KEY}&language=en-US&page=${page}`;

  const response = await fetch(url);

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.status_message || "TMDB request failed");
  }

  return response.json();
};

export const getMovie = async (id) => {
  const response = await fetch(
    `${TMDB_BASE}/movie/${id}?api_key=${process.env.TMDB_KEY}&language=en-US`
  );

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.status_message || "TMDB request failed");
  }

  return response.json();
};


export const getMovieCredits = async (id) => {
  const response = await fetch(
    `${TMDB_BASE}/movie/${id}/credits?api_key=${process.env.TMDB_KEY}&language=en-US`
  );

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.status_message || "TMDB request failed");
  }

  return response.json();
};

export const getMovieImages = async (id) => {
  const response = await fetch(
    `${TMDB_BASE}/movie/${id}/images?api_key=${process.env.TMDB_KEY}`
  );

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.status_message || "TMDB request failed");
  }

  return response.json();
};

export const getMovieReviews = async (id) => {
  const response = await fetch(
    `${TMDB_BASE}/movie/${id}/reviews?api_key=${process.env.TMDB_KEY}&language=en-US`
  );

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.status_message || "TMDB request failed");
  }

  return response.json();
};

export const getMovieRecommendations = async (id, page = 1) => {
  const response = await fetch(
    `${TMDB_BASE}/movie/${id}/recommendations?api_key=${process.env.TMDB_KEY}&language=en-US&page=${page}`
  );

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.status_message || "TMDB request failed");
  }

  return response.json();
};


export const getPerson = async (id) => {
  const response = await fetch(
    `${TMDB_BASE}/person/${id}?api_key=${process.env.TMDB_KEY}&language=en-US`
  );

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.status_message || "TMDB request failed");
  }

  return response.json();
};

export const getPersonMovieCredits = async (id) => {
  const response = await fetch(
    `${TMDB_BASE}/person/${id}/movie_credits?api_key=${process.env.TMDB_KEY}&language=en-US`
  );

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.status_message || "TMDB request failed");
  }

  return response.json();
};


export const searchMulti = async (query, page = 1) => {
  const response = await fetch(
    `${TMDB_BASE}/search/multi?api_key=${process.env.TMDB_KEY}&language=en-US&query=${encodeURIComponent(
      query
    )}&page=${page}&include_adult=false`
  );

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.status_message || "TMDB request failed");
  }

  return response.json();
};

