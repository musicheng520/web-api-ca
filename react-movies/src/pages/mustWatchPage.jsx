import React from "react";
import PageTemplate from "../components/templateMovieListPage";
import { useQuery, useQueries } from "@tanstack/react-query";
import { getMovie, getWatchlist } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import RemoveFromMustWatchIcon from "../components/cardIcons/removeFromMustWatch";

const MustWatchPage = () => {
  const watchlistQuery = useQuery({
    queryKey: ["watchlist"],
    queryFn: getWatchlist,
  });

  const watchlistDocs = watchlistQuery.data || [];
  const movieIds = watchlistDocs.map((w) => w.movieId);

  // Always call useQueries (even if empty) -> no Hook order crash
  const movieQueries = useQueries({
    queries: movieIds.map((movieId) => ({
      queryKey: ["movie", { id: movieId }],
      queryFn: getMovie,
      enabled: watchlistQuery.isSuccess,
    })),
  });

  if (watchlistQuery.isPending) return <Spinner />;
  if (watchlistQuery.isError) return <p>{watchlistQuery.error.message}</p>;

  if (movieIds.length === 0) {
    return (
      <h3 style={{ textAlign: "center", marginTop: "2rem" }}>
        No movies in your Must Watch list yet.
      </h3>
    );
  }

  const isMoviePending = movieQueries.some((q) => q.isPending);
  if (isMoviePending) return <Spinner />;

  const movies = movieQueries.map((q) => {
    q.data.genre_ids = q.data.genres.map((g) => g.id);
    return q.data;
  });

  // Map movieId -> watchlist document _id (for delete)
  const watchlistIdByMovieId = new Map(watchlistDocs.map((w) => [w.movieId, w._id]));

  return (
    <PageTemplate
      title="My Must Watch Movies"
      movies={movies}
      action={(movie) => (
        <RemoveFromMustWatchIcon watchlistId={watchlistIdByMovieId.get(movie.id)} />
      )}
    />
  );
};

export default MustWatchPage;
