import React from "react";
import PageTemplate from "../components/templateMovieListPage";
import { useQuery, useQueries } from "@tanstack/react-query";
import { getMovie, getFavourites } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import RemoveFromFavorites from "../components/cardIcons/removeFromFavorites";
import WriteReview from "../components/cardIcons/writeReview";

const FavoriteMoviesPage = () => {
  const favQuery = useQuery({
    queryKey: ["favourites"],
    queryFn: getFavourites,
  });

  // IMPORTANT: Always compute movieIds (even while loading)
  const favouriteDocs = favQuery.data || [];
  const movieIds = favouriteDocs.map((f) => f.movieId);

  // IMPORTANT: Always call useQueries (even if movieIds is empty)
  const movieQueries = useQueries({
    queries: movieIds.map((movieId) => ({
      queryKey: ["movie", { id: movieId }],
      queryFn: getMovie,
      enabled: favQuery.isSuccess, // Only start when favourites loaded
    })),
  });

  // Now it is safe to return early (hooks already called)
  if (favQuery.isPending) return <Spinner />;
  if (favQuery.isError) return <p>{favQuery.error.message}</p>;

  const isMoviePending = movieQueries.some((q) => q.isPending);
  if (isMoviePending) return <Spinner />;

  const movies = movieQueries.map((q) => {
    q.data.genre_ids = q.data.genres.map((g) => g.id);
    return q.data;
  });

  const favIdByMovieId = new Map(favouriteDocs.map((f) => [f.movieId, f._id]));

  return (
    <PageTemplate
      title="Favorite Movies"
      movies={movies}
      action={(movie) => (
        <>
          <RemoveFromFavorites favouriteId={favIdByMovieId.get(movie.id)} />
          <WriteReview movie={movie} />
        </>
      )}
    />
  );
};

export default FavoriteMoviesPage;
