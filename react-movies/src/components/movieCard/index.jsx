import React, { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import { Link } from "react-router";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CalendarIcon from "@mui/icons-material/CalendarTodayTwoTone";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import img from "../../images/film-poster-placeholder.png";
import Avatar from "@mui/material/Avatar";
import Rating from "@mui/material/Rating"; 
import Stack from "@mui/material/Stack";   

export default function MovieCard({ movie, action }) {
  const { favorites, addToFavorites } = useContext(MoviesContext);

  if (favorites.find((id) => id === movie.id)) {
    movie.favorite = true;
  } else {
    movie.favorite = false;
  }

  const handleAddToFavorite = (e) => {
    e.preventDefault();
    addToFavorites(movie);
  };

  return (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <CardHeader
        avatar={
          movie.favorite ? (
            <Avatar sx={{ backgroundColor: "red" }}>
              <FavoriteIcon />
            </Avatar>
          ) : null
        }
        title={
          <Typography variant="h6" component="p" noWrap>
            {movie.title}
          </Typography>
        }
      />

      <CardMedia
        sx={{ height: 500 }}
        image={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
            : img
        }
      />

      <CardContent>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography variant="body2" color="text.secondary">
              <CalendarIcon fontSize="small" sx={{ mr: 0.5 }} />
              {movie.release_date}
            </Typography>
          </Grid>

          
          <Grid item xs={12}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Rating
                name="read-only"
                value={movie.vote_average / 2} 
                precision={0.5}
                readOnly
                size="small"
                sx={{ color: "#f5c518" }}
              />
              <Typography variant="body2" color="text.secondary">
                {movie.vote_average.toFixed(1)}
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </CardContent>

      <CardActions disableSpacing sx={{ mt: "auto" }}>
        {action(movie)}

        <Link to={`/movies/${movie.id}`}>
          <Button variant="outlined" size="medium" color="primary">
            More Info ...
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
}
