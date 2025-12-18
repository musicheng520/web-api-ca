// src/components/personMovieList/index.jsx
import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import MovieCard from "../movieCard";

const PersonMovieList = ({ movies }) => {
  if (!movies || movies.length === 0) {
    return <p style={{ padding: "10px" }}>No movies available.</p>;
  }

  return (
    <Grid
      container
      spacing={1.2} // 🔹 balanced gap
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "stretch",
        padding: "6px 0",
      }}
    >
      {movies.slice(0, 16).map((m) => (
        <Grid
          item
          key={m.id}
          xs={6}
          sm={4}
          md={2.8} // 🔹 a bit wider (≈4 per row)
          lg={2.8}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "stretch",
          }}
        >
          <Box
            sx={{
              width: "92%",               
              transform: "scale(0.8)",    
              transformOrigin: "top center",
              display: "flex",
              justifyContent: "center",
              alignItems: "stretch",
            }}
          >
            <MovieCard movie={m} action={() => {}} />
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default PersonMovieList;
