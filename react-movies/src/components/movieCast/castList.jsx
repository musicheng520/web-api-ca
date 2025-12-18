import React from "react";
import CastCard from "./CastCard";
import Grid from "@mui/material/Grid";

const CastList = ({ casts }) => {
  if (!casts || casts.length === 0) {
    return <p style={{ padding: "10px" }}>No cast available.</p>;
  }

  return (
    <Grid
      container
      spacing={2}
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        rowGap: 2,
      }}
    >
      {casts.slice(0, 16).map((c) => (
        <Grid
          item
          key={c.id}
          xs={6}
          sm={4}
          md={3}
          lg={2}
          xl={2}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <CastCard cast={c} />
        </Grid>
      ))}
    </Grid>
  );
};

export default CastList;
