import React from "react";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";

const root = {
  display: "flex",
  justifyContent: "flex-start",
  flexWrap: "wrap",
  listStyle: "none",
  padding: 1.5,
  margin: 0,
};
const chip = { margin: 0.5 };

const PersonDetails = ({ person }) => {
  return (
    <>
      <Typography variant="h5" component="h3">
        Overview
      </Typography>
      <Typography variant="h6" component="p" sx={{ mb: 2 }}>
        {person.biography || "No biography available."}
      </Typography>

      <Paper component="ul" sx={{ ...root }}>
        <li>
          <Chip label="Department" sx={{ ...chip }} color="primary" />
        </li>
        <Chip label={person.known_for_department || "—"} sx={{ ...chip }} />
      </Paper>

      <Paper component="ul" sx={{ ...root }}>
        <li>
          <Chip label="Born" sx={{ ...chip }} color="secondary" />
        </li>
        <Chip label={person.birthday || "—"} sx={{ ...chip }} />

        <li>
          <Chip label="Place" sx={{ ...chip }} color="secondary" />
        </li>
        <Chip label={person.place_of_birth || "—"} sx={{ ...chip }} />
      </Paper>
    </>
  );
};

export default PersonDetails;
