import React from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteFromWatchlist } from "../../api/tmdb-api";

const RemoveFromMustWatchIcon = ({ watchlistId }) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => deleteFromWatchlist(watchlistId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["watchlist"] });
    },
  });

  const handleRemove = (e) => {
    e.preventDefault();
    if (!watchlistId) return;
    mutation.mutate();
  };

  return (
    <IconButton aria-label="remove from must watch" onClick={handleRemove}>
      <DeleteIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default RemoveFromMustWatchIcon;
