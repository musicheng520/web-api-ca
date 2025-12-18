import React from "react";
import { useParams } from 'react-router';
import MovieDetails from "../components/movieDetails/";
import PageTemplate from "../components/templateMoviePage";
import useMovie from "../hooks/useMovie";
import MovieRecommendations from "../components/movieRecommendations";
import { useQuery } from '@tanstack/react-query';
import Spinner from '../components/spinner'
import CastList from "../components/movieCast/castList";
import { getMovie, getMovieCredits } from "../api/tmdb-api";


const MoviePage = () => {
  const { id } = useParams();

  // movie
  const {
    data: movie,
    error: movieError,
    isPending: moviePending,
    isError: movieIsError,
  } = useQuery({
    queryKey: ["movie", { id }],
    queryFn: getMovie,
  });

  // actors
  const {
    data: credits,
    error: creditsError,
    isPending: creditsPending,
    isError: creditsIsError,
  } = useQuery({
    queryKey: ["credits", { id }],
    queryFn: getMovieCredits,
  });

  if (moviePending || creditsPending) return <Spinner />;
  if (movieIsError) return <h1>{movieError.message}</h1>;
  if (creditsIsError) return <h1>{creditsError.message}</h1>;

  const casts = credits?.cast || [];

  return (
    <>
      {movie ? (
        <PageTemplate movie={movie}>
          <MovieDetails movie={movie} />
          <h2 style={{ marginTop: "1.5rem" }}>Cast</h2>
          <CastList casts={casts} />
          <MovieRecommendations movieId={id}/>
        </PageTemplate>
      ) : (
        <p>Waiting for movie details...</p>
      )}
    </>
  );
};

export default MoviePage;
