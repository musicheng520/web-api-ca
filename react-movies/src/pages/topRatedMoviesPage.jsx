import MoviePaginationPage from "./moviePaginationPage";
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";

const TopRatedMoviesPage = () => (
  <MoviePaginationPage category="top_rated" title="Top Rated Movies"
  action={(movie) => <AddToFavoritesIcon movie={movie} />}
  />
  
);

export default TopRatedMoviesPage;
