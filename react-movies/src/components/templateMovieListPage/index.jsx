import React, { useState } from "react";
import Header from "../headerMovie";
import FilterCard from "../filterMoviesCard";
import MovieList from "../movieList";
import Grid from "@mui/material/Grid";

function MovieListPageTemplate({ movies, title, action }) {

  const [nameFilter, setNameFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("0");
  const [yearFilter, setYearFilter] = useState("All");
  const genreId = Number(genreFilter);



  const handleChange = (type, value) => {
  if (type === "name") setNameFilter(value);
  else if (type === "genre") setGenreFilter(value);
  else if (type === "year") setYearFilter(value);
};

let displayedMovies = movies
  .filter((m) =>
    m.title.toLowerCase().includes(nameFilter.toLowerCase())
  )
  .filter((m) =>
    genreId > 0 ? m.genre_ids.includes(genreId) : true
  )
  .filter((m) => {
    if (yearFilter === "All") return true;
    const year = parseInt(m.release_date?.substring(0, 4));
    if (yearFilter === "2020") return year >= 2020;
    if (yearFilter === "2010") return year >= 2010 && year < 2020;
    if (yearFilter === "2000") return year >= 2000 && year < 2010;
    if (yearFilter === "1990") return year < 2000;
    return true;
  });


  return (
    <Grid container>
      <Grid size={12}>
        <Header title={title} />
      </Grid>
      <Grid container sx={{flex: "1 1 500px"}}>
        <Grid 
          key="find" 
          size={{xs: 12, sm: 6, md: 4, lg: 3, xl: 2}} 
          sx={{padding: "20px"}}
        >
          <FilterCard
  onUserInput={handleChange}
  titleFilter={nameFilter}
  genreFilter={genreFilter}
  yearFilter={yearFilter}
/>

        </Grid>
        <MovieList action={action} movies={displayedMovies}></MovieList>
      </Grid>
    </Grid>
  );
}
export default MovieListPageTemplate;
