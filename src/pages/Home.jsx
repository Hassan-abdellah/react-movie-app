import { useEffect} from "react"
import Showcase from "../components/showcase/Showcase"
import Spinner from "../components/spinner/Spinner";
const Home = ({ popularMovies, topMovies, nowMovies, upcomingMovies,setPage,isLoading }) => {
    useEffect(() => {
        document.title = 'Home | Movies APP';
        setPage(1);
    }, []);
    if(isLoading){
        return(
            <Spinner/>
        )
    }
    return (
        <div className="wrapper">
            <Showcase moviescategory={popularMovies} header="Popular Movies" url='popular' />
            <Showcase moviescategory={topMovies} header="Top Rated Movies" url='top_rated' />
            <Showcase moviescategory={nowMovies} header="Now Playing Movies" url='now_playing' />
            <Showcase moviescategory={upcomingMovies} header="Coming Soon" url='upcoming' />
        </div>
    )
}

export default Home