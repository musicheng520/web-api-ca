import React, { useState } from "react";
import { useLocation } from "react-router";
import { useQuery } from "@tanstack/react-query";
import PageTemplate from "../components/templateMovieListPage";
import { searchMulti } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const SearchResultsPage = () => {
  const { search } = useLocation();
  const query = new URLSearchParams(search).get("q");
  const [page, setPage] = useState(1);

  if (!query || query.trim() === "") {
    return (
      <h3 style={{ textAlign: "center", marginTop: "2rem" }}>
        Please enter a search term.
      </h3>
    );
  }

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["search", { query, page }],
    queryFn: searchMulti,
    keepPreviousData: true, 
  });

  if (isLoading) return <Spinner />;
  if (isError)
    return (
      <h3 style={{ textAlign: "center", marginTop: "2rem", color: "red" }}>
        Error: {error.message}
      </h3>
    );

  const movies = data.results
    ? data.results.filter((item) => item.media_type === "movie")
    : [];

  if (movies.length === 0) {
    return (
      <h3 style={{ textAlign: "center", marginTop: "2rem" }}>
        No movies found for “{query}”.
      </h3>
    );
  }

  const normalizedMovies = movies.map((m) => ({
    ...m,
    genre_ids: m.genre_ids || [],
  }));

  return (
    <>
      <PageTemplate
        title={`Search Results for “${query}”`}
        movies={normalizedMovies}
        action={() => null}
      />
      <Stack alignItems="center" sx={{ mt: 3, mb: 5 }}>
        <Pagination
          count={Math.min(data.total_pages, 20)}
          page={page}
          onChange={(e, value) => setPage(value)}
          color="primary"
          size="large"
        />
      </Stack>
    </>
  );
};

export default SearchResultsPage;
