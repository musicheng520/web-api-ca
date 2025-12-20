import React from "react";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addFavourite } from "../../api/tmdb-api";

const AddToFavoritesIcon = ({ movie }) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () =>
      addFavourite({
        movieId: movie.id,
        title: movie.title,
        posterPath: movie.poster_path,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favourites"] });
    },
  });

  const handleAddToFavorites = (e) => {
    e.preventDefault();
    mutation.mutate();
  };

  return (
    <IconButton aria-label="add to favorites" onClick={handleAddToFavorites}>
      <FavoriteIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default AddToFavoritesIcon;
