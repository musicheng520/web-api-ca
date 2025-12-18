import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getMovieRecommendations } from "../../api/tmdb-api";
import Spinner from "../spinner";
import Typography from "@mui/material/Typography";
import MovieList from "../movieList";
import Grid from "@mui/material/Grid";
import AddToFavoritesIcon from "../cardIcons/addToFavorites"; 



const MovieRecommendations = ({ movieId }) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["recommendations", { id: movieId }],
    queryFn: getMovieRecommendations,
  });

  if (isLoading) return <Spinner />;
  if (isError)
    return (
      <Typography color="error" align="center">
        {error.message}
      </Typography>
    );

  const movies = data.results || [];
  if (movies.length === 0)
    return (
      <Typography variant="body1" sx={{ mt: 2 }} align="center">
        No recommendations available.
      </Typography>
    );

  return (
    <div style={{ marginTop: "2rem", padding: "1rem" }}>
      <Typography
        variant="h5"
        sx={{ mb: 2, fontWeight: "bold", textAlign: "center" }}
      >
        Recommended Movies
      </Typography>

      
     <Grid container sx={{ flex: "1 1 500px" }}>
        <MovieList
          action={(movie) => <AddToFavoritesIcon movie={movie} />}
          movies={movies.slice(0, 8)}
        />
      </Grid>

    </div>
  );
};

export default MovieRecommendations;
