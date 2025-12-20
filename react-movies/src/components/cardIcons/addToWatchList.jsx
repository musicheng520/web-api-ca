import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addToWatchlist } from "../../api/tmdb-api";

const AddToWatchlistIcon = ({ movie }) => {
  const queryClient = useQueryClient();
  const [added, setAdded] = useState(false);

  const mutation = useMutation({
    mutationFn: () =>
      addToWatchlist({
        movieId: movie.id,
        title: movie.title,
        posterPath: movie.poster_path,
      }),
    onSuccess: () => {
      setAdded(true);
      queryClient.invalidateQueries({ queryKey: ["watchlist"] });
    },
    onError: () => {
      setAdded(false);
    },
  });

  const handleAdd = (e) => {
    e.preventDefault();
    if (added) return;
    mutation.mutate();
  };

  return (
    <IconButton aria-label="add to watchlist" onClick={handleAdd} disabled={added || mutation.isPending}>
      <PlaylistAddIcon color={added ? "secondary" : "primary"} fontSize="large" />
    </IconButton>
  );
};

export default AddToWatchlistIcon;
