import React, { useState } from "react";
import { useNavigate } from "react-router";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim() !== "") {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <Box component="form" onSubmit={handleSearch} sx={{ display: "flex", alignItems: "center" }}>
      <TextField
        variant="outlined"
        size="small"
        placeholder="Search movies or people..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        sx={{ backgroundColor: "white", borderRadius: 1 }}
      />
      <IconButton type="submit" aria-label="search">
        <SearchIcon color="primary" />
      </IconButton>
    </Box>
  );
};

export default SearchBar;
