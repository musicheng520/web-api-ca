import React from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../components/spinner";
import { getPerson, getPersonMovieCredits } from "../api/tmdb-api";
import TemplatePersonPage from "../components/templatePersonPage";
import Typography from "@mui/material/Typography";
import MovieList from "../components/movieList";
import PersonMovieList from "../components/personMovieList";



const PersonPage = () => {
  const { id } = useParams();

  const { data: person, isPending: p1, isError: e1, error: err1 } = useQuery({
    queryKey: ["person", { id }],
    queryFn: getPerson,
  });

  const { data: credits, isPending: p2, isError: e2, error: err2 } = useQuery({
    queryKey: ["personMovies", { id }],
    queryFn: getPersonMovieCredits,
  });

  if (p1 || p2) return <Spinner />;
  if (e1) return <h1>{err1.message}</h1>;
  if (e2) return <h1>{err2.message}</h1>;

  const movies = (credits?.cast || []).slice(0, 18);

  return person ? (
    <TemplatePersonPage person={person}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
        {person.name}
      </Typography>
      <Typography variant="subtitle1" sx={{ color: "text.secondary", mb: 2 }}>
        {person.known_for_department || "Actor / Actress"}
      </Typography>

      <Typography variant="body1" sx={{ mb: 0.5 }}>
        <strong>Born:</strong> {person.birthday || "—"}
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        <strong>Place of Birth:</strong> {person.place_of_birth || "—"}
      </Typography>

      {person.biography && (
        <>
          <Typography variant="h6" sx={{ fontWeight: 700, mt: 2, mb: 1 }}>
            Biography
          </Typography>
          <Typography
            variant="body1"
            sx={{
              lineHeight: 1.6,
              textAlign: "justify",
              mb: 3,
              maxHeight: 240,
              overflowY: "auto",
            }}
          >
            {person.biography}
          </Typography>
        </>
      )}

      <Typography variant="h5" sx={{ fontWeight: 700, mt: 3, mb: 2 }}>
        Movies featuring this actor
      </Typography>
      <PersonMovieList movies={movies} />
    </TemplatePersonPage>
  ) : (
    <p>Waiting for actor details...</p>
  );
};

export default PersonPage;
