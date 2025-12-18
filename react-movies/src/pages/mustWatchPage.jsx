import React, { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "@tanstack/react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import RemoveFromMustWatchIcon from "../components/cardIcons/removeFromMustWatch";

const MustWatchPage = () => {
  const { mustWatch: movieIds } = useContext(MoviesContext);

  
  if (movieIds.length === 0) {
    return <h3 style={{ textAlign: "center", marginTop: "2rem" }}>No movies in your Must Watch list yet.</h3>;
  }

  
  const mustWatchQueries = useQueries({
    queries: movieIds.map((movieId) => ({
      queryKey: ["movie", { id: movieId }],
      queryFn: getMovie,
    })),
  });

 
  const isPending = mustWatchQueries.find((m) => m.isPending === true);
  if (isPending) return <Spinner />;

  
  const movies = mustWatchQueries.map((q) => {
    q.data.genre_ids = q.data.genres.map((g) => g.id);
    return q.data;
  });

  return (
    <PageTemplate
      title="My Must Watch Movies"
      movies={movies}
      action={(movie) => <RemoveFromMustWatchIcon movie={movie} />}
    />
  );
};

export default MustWatchPage;
