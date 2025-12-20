import React from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteFavourite } from "../../api/tmdb-api";

const RemoveFromFavoritesIcon = ({ favouriteId }) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => deleteFavourite(favouriteId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favourites"] });
    },
  });

  const handleRemoveFromFavorites = (e) => {
    e.preventDefault();
    if (!favouriteId) return;
    mutation.mutate();
  };

  return (
    <IconButton aria-label="remove from favorites" onClick={handleRemoveFromFavorites}>
      <DeleteIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default RemoveFromFavoritesIcon;
