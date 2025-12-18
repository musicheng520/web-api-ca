import MoviePaginationPage from "./moviePaginationPage";
import AddToWatchlistIcon from "../components/cardIcons/addToWatchList";


const UpcomingMoviesPage = () => (
  <MoviePaginationPage
    category="upcoming"
    title="Upcoming Movies"
    action={(movie) => <AddToWatchlistIcon movie={movie} />}
  />

);

export default UpcomingMoviesPage;