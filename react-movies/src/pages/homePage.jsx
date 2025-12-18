import MoviePaginationPage from "./moviePaginationPage";
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";

const HomePage = () => (
  <MoviePaginationPage
    category="popular"
    title="Discover Movies"
    action={(movie) => <AddToFavoritesIcon movie={movie} />}
  />
);

export default HomePage;
