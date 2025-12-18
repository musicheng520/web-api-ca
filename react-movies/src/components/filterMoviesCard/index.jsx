import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import img from "../../images/pexels-dziana-hasanbekava-5480827.jpg";
import { getGenres } from "../../api/tmdb-api";
import { useQuery } from '@tanstack/react-query';
import Spinner from '../spinner';



const formControl = {
  margin: 1,
  minWidth: "90%",
  backgroundColor: "rgb(255, 255, 255)"
};

export default function FilterMoviesCard(props) {
    const { data, error, isPending, isError } = useQuery({
    queryKey: ['genres'],
    queryFn: getGenres,
  });

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }
  const genres = data.genres;
  if (genres[0].name !== "All"){
    genres.unshift({ id: "0", name: "All" });
  }

const handleChange = (type, value) => {
  props.onUserInput(type, value);
};

const handleTextChange = (e) => {
  handleChange("name", e.target.value);
};

const handleGenreChange = (e) => {
  handleChange("genre", e.target.value);
};


  return (
    <Card
      sx={{
        backgroundColor: "rgb(204, 204, 0)"
      }}
      variant="outlined"
    >
      <CardContent>
        <Typography variant="h5" component="h1">
          <SearchIcon fontSize="large" />
          Filter the movies.
        </Typography>

        <TextField
          sx={{ ...formControl }}
          id="filled-search"
          label="Search field"
          type="search"
          variant="filled"
          value={props.titleFilter}
          onChange={handleTextChange}
        />

        <FormControl sx={{ ...formControl }}>
          <InputLabel id="genre-label">Genre</InputLabel>
          <Select
            labelId="genre-label"
            id="genre-select"
            defaultValue=""
            value={props.genreFilter}
            onChange={handleGenreChange}
          >
            {genres.map((genre) => (
              <MenuItem key={genre.id} value={genre.id}>
                {genre.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ ...formControl }}>
  <InputLabel id="year-label">Year</InputLabel>
  <Select
    labelId="year-label"
    id="year-select"
    value={props.yearFilter}
    onChange={(e) => props.onUserInput("year", e.target.value)}
  >
    <MenuItem value="All">All</MenuItem>
    <MenuItem value="2020">From 2020s</MenuItem>
    <MenuItem value="2010">From 2010s</MenuItem>
    <MenuItem value="2000">From 2000s</MenuItem>
    <MenuItem value="1990">Before 2000</MenuItem>
  </Select>
</FormControl>
      </CardContent>

      <CardMedia sx={{ height: 300 }} image={img} title="Filter" />

      <CardContent>
        <Typography variant="h5" component="h1">
          <SearchIcon fontSize="large" />
          Filter the movies.
          <br />
        </Typography>
      </CardContent>
    </Card>
  );
}
