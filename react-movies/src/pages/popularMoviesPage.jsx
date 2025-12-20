// src/pages/popularMoviesPage.jsx
import MoviePaginationPage from "./moviePaginationPage";
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";

const PopularMoviesPage = () => (
  <MoviePaginationPage category="popular" title="Popular Movies"
  action={(movie) => <AddToFavoritesIcon movie={movie} />}
  />
);

export default PopularMoviesPage;
