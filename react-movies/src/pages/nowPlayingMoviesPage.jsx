import MoviePaginationPage from "./moviePaginationPage";
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";

const NowPlayingMoviesPage = () => (
  <MoviePaginationPage category="now_playing" title="Now Playing Movies"
  action={(movie) => <AddToFavoritesIcon movie={movie} />}
  />
);

export default NowPlayingMoviesPage;