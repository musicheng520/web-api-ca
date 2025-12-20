/*
export const getMovies = ({ queryKey }) => {
  const [, { category, page }] = queryKey;

  const baseUrl =
    category === "discover" || !category
      ? "https://api.themoviedb.org/3/discover/movie"
      : `https://api.themoviedb.org/3/movie/${category}`;

  return fetch(
    `${baseUrl}?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&page=${page}`
  )
    .then((response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.status_message || "Something went wrong");
        });
      }
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
};
*/
const API_BASE = "http://localhost:8080/api";

export const getMovies = ({ queryKey }) => {
  const [, { category, page }] = queryKey;

  // Map your old categories to backend endpoints
  const endpoint =
    category === "discover" || !category
      ? "discover"
      : category; // e.g. "popular", "top_rated", "now_playing", "upcoming"

  return fetch(`${API_BASE}/movies/${endpoint}?page=${page ?? 1}`)
    .then((response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.status_message || "Something went wrong");
        });
      }
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
};
export const getMovie = ({ queryKey }) => {
  const [, { id }] = queryKey;
  return fetch(`${API_BASE}/movies/${id}`)
    .then((response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.status_message || "Something went wrong");
        });
      }
      return response.json();
    });
};

/*
export const getMovie = (args) => {
  //console.log(args)
  const [, idPart] = args.queryKey;
  const { id } = idPart;
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.VITE_TMDB_KEY}`
  ).then((response) => {
    if (!response.ok) {
      return response.json().then((error) => {
        throw new Error(error.status_message || "Something went wrong");
      });
    }
    return response.json();
  })
  .catch((error) => {
    throw error
 });
};
*/

export const getGenres = () => {
  return fetch(`${API_BASE}/movies/genres`)
    .then((response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.status_message || "Something went wrong");
        });
      }
      return response.json();
    });
};

/*
  export const getGenres = () => {
    return fetch(
      "https://api.themoviedb.org/3/genre/movie/list?api_key=" +
        import.meta.env.VITE_TMDB_KEY +
        "&language=en-US"
    ).then( (response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.status_message || "Something went wrong");
        });
      }
      return response.json();
    })
    .catch((error) => {
      throw error
   });
  };
*/
/*
  export const getMovieImages = ({ queryKey }) => {
    const [, idPart] = queryKey;
    const { id } = idPart;
    return fetch(
      `https://api.themoviedb.org/3/movie/${id}/images?api_key=${import.meta.env.VITE_TMDB_KEY}`
    ).then( (response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.status_message || "Something went wrong");
        });
      }
      return response.json();
    })
    .catch((error) => {
      throw error
   });
  };



  export const getMovieReviews = ({ queryKey }) => {
    const [, idPart] = queryKey;
    const { id } = idPart;
    return fetch(
      `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${import.meta.env.VITE_TMDB_KEY}`
    ).then( (response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.status_message || "Something went wrong");
        });
      }
      return response.json();
    })
    .catch((error) => {
      throw error
   });
  };


export const getUpcomingMovies = () => {
  return fetch(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&page=1`
  )
  .then((response) => {
    if (!response.ok) {
      return response.json().then((error) => {
        throw new Error(error.status_message || "Something went wrong");
      });
    }
    return response.json();
  })
  .catch((error) => {
    throw error;
  });
};

export const getPopularMovies = () => {
  return fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&page=1`
  )
  .then((response) => {
    if (!response.ok) {
      return response.json().then((error) => {
        throw new Error(error.status_message || "Something went wrong");
      });
    }
    return response.json();
  })
  .catch((error) => {
    throw error;
  });
};


export const getTopRatedMovies = () => {
  return fetch(
    `https://api.themoviedb.org/3/movie/top_rated?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&page=1`
  )
  .then((response) => {
    if (!response.ok) {
      return response.json().then((error) => {
        throw new Error(error.status_message || "Something went wrong");
      });
    }
    return response.json();
  })
  .catch((error) => {
    throw error;
  });
};


export const getNowPlayingMovies = () => {
  return fetch(
    `https://api.themoviedb.org/3/movie/now_playing?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&page=1`
  )
  .then((response) => {
    if (!response.ok) {
      return response.json().then((error) => {
        throw new Error(error.status_message || "Something went wrong");
      });
    }
    return response.json();
  })
  .catch((error) => {
    throw error;
  });
};

export const getMovieRecommendations = ({ queryKey }) => {
  const [, idPart] = queryKey;
  const { id } = idPart;
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&page=1`
  )
    .then((response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.status_message || "Something went wrong");
        });
      }
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
};


export const getMovieCredits = ({ queryKey }) => {
  const [, { id }] = queryKey;
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${
      import.meta.env.VITE_TMDB_KEY
    }&language=en-US`
  )
    .then((response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.status_message || "Something went wrong");
        });
      }
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
};


export const getPerson = ({ queryKey }) => {
  const [, idPart] = queryKey;
  const { id } = idPart;

  return fetch(
    `https://api.themoviedb.org/3/person/${id}?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US`
  )
    .then((response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.status_message || "Failed to fetch person");
        });
      }
      return response.json();
    })
    .catch((error) => {
      console.error(" Error fetching person:", error);
      throw error;
    });
};


export const getPersonMovieCredits = ({ queryKey }) => {
  const [, idPart] = queryKey;
  const { id } = idPart;

  return fetch(
    `https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US`
  )
    .then((response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.status_message || "Failed to fetch credits");
        });
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Error fetching person movie credits:", error);
      throw error;
    });
};



export const searchMulti = ({ queryKey }) => {
  const [, { query, page }] = queryKey;

  return fetch(
    `https://api.themoviedb.org/3/search/multi?api_key=${
      import.meta.env.VITE_TMDB_KEY
    }&language=en-US&query=${query}&page=${page}&include_adult=false`
  )
    .then((response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.status_message || "Failed to fetch search results");
        });
      }
      return response.json();
    })
    .catch((error) => {
      console.error(" Error fetching search results:", error);
      throw error;
    });
};



*/
export const getMovieImages = ({ queryKey }) => {
  const [, { id }] = queryKey;
  return fetch(`${API_BASE}/movies/${id}/images`)
    .then((response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.status_message || "Something went wrong");
        });
      }
      return response.json();
    });
};

export const getMovieReviews = ({ queryKey }) => {
  const [, { id }] = queryKey;
  return fetch(`${API_BASE}/movies/${id}/reviews`)
    .then((response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.status_message || "Something went wrong");
        });
      }
      return response.json();
    });
};


export const getUpcomingMovies = () => {
  return fetch(`${API_BASE}/movies/upcoming?page=1`)
    .then((response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.status_message || "Something went wrong");
        });
      }
      return response.json();
    });
};

export const getPopularMovies = () => {
  return fetch(`${API_BASE}/movies/popular?page=1`)
    .then((response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.status_message || "Something went wrong");
        });
      }
      return response.json();
    });
};

export const getTopRatedMovies = () => {
  return fetch(`${API_BASE}/movies/top_rated?page=1`)
    .then((response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.status_message || "Something went wrong");
        });
      }
      return response.json();
    });
};

export const getNowPlayingMovies = () => {
  return fetch(`${API_BASE}/movies/now_playing?page=1`)
    .then((response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.status_message || "Something went wrong");
        });
      }
      return response.json();
    });
};

export const getMovieRecommendations = ({ queryKey }) => {
  const [, { id }] = queryKey;
  return fetch(`${API_BASE}/movies/${id}/recommendations?page=1`)
    .then((response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.status_message || "Something went wrong");
        });
      }
      return response.json();
    });
};

export const getMovieCredits = ({ queryKey }) => {
  const [, { id }] = queryKey;
  return fetch(`${API_BASE}/movies/${id}/credits`)
    .then((response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.status_message || "Something went wrong");
        });
      }
      return response.json();
    });
};

export const getPerson = ({ queryKey }) => {
  const [, { id }] = queryKey;

  return fetch(`${API_BASE}/people/${id}`)
    .then((response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.status_message || "Failed to fetch person");
        });
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Error fetching person:", error);
      throw error;
    });
};

export const getPersonMovieCredits = ({ queryKey }) => {
  const [, { id }] = queryKey;

  return fetch(`${API_BASE}/people/${id}/movie_credits`)
    .then((response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.status_message || "Failed to fetch credits");
        });
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Error fetching person movie credits:", error);
      throw error;
    });
};

export const searchMulti = ({ queryKey }) => {
  const [, { query, page }] = queryKey;

  return fetch(
    `${API_BASE}/search/multi?query=${encodeURIComponent(query)}&page=${page ?? 1}`
  )
    .then((response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.status_message || "Failed to fetch search results");
        });
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Error fetching search results:", error);
      throw error;
    });
};

//favourite movie
const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const getFavourites = () => {
  return fetch(`${API_BASE}/favourites`, {
    headers: {
      ...getAuthHeader(),
    },
  }).then((response) => {
    if (!response.ok) {
      return response.json().then((error) => {
        throw new Error(error.msg || error.message || "Failed to fetch favourites");
      });
    }
    return response.json();
  });
};

export const addFavourite = (payload) => {
  return fetch(`${API_BASE}/favourites`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader(),
    },
    body: JSON.stringify(payload),
  }).then((response) => {
    if (!response.ok) {
      return response.json().then((error) => {
        throw new Error(error.msg || error.message || "Failed to add favourite");
      });
    }
    return response.json();
  });
};

export const deleteFavourite = (favouriteId) => {
  return fetch(`${API_BASE}/favourites/${favouriteId}`, {
    method: "DELETE",
    headers: {
      ...getAuthHeader(),
    },
  }).then((response) => {
    if (!response.ok) {
      return response.json().then((error) => {
        throw new Error(error.msg || error.message || "Failed to delete favourite");
      });
    }
    return response.json();
  });
};

// watchlist
export const getWatchlist = () =>
  fetch(`${API_BASE}/watchlist`, {
    headers: {
      ...getAuthHeader(),
    },
  }).then((response) => {
    if (!response.ok) {
      return response.json().then((error) => {
        throw new Error(error.msg || error.message || "Failed to fetch watchlist");
      });
    }
    return response.json();
  });

export const addToWatchlist = (movie) =>
  fetch(`${API_BASE}/watchlist`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader(),
    },
    body: JSON.stringify(movie),
  }).then((response) => {
    if (!response.ok) {
      return response.json().then((error) => {
        throw new Error(error.msg || error.message || "Failed to add to watchlist");
      });
    }
    return response.json();
  });

export const deleteFromWatchlist = (id) =>
  fetch(`${API_BASE}/watchlist/${id}`, {
    method: "DELETE",
    headers: {
      ...getAuthHeader(),
    },
  }).then((response) => {
    if (!response.ok) {
      return response.json().then((error) => {
        throw new Error(error.msg || error.message || "Failed to remove from watchlist");
      });
    }
    return response.json();
  });
