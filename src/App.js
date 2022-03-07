import { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import SingleCategory from './pages/SingleCategory';
import SingleMovie from './pages/SingleMovie';
import Navbar from './components/nav/Navbar';
import Modal from './components/modal/Modal';
import { AnimatePresence } from 'framer-motion';
import SingleActor from './pages/SingleActor';
import Footer from './components/footer/Footer';
function App() {

  const [popularMovies, setPopularMovies] = useState([]);
  const [topMovies, setTopMovies] = useState([]);
  const [nowMovies, setNowMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [isModal,setIsModal] = useState(false);
  const [modalImage,setModalImage] = useState('');
  useEffect(() => {
    const getMovies = async (type, page) => {
      setIsLoading(true);
      const res = await axios.get(`${process.env.REACT_APP_BASE_URI}/movie/${type}?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`);
      switch (type) {
        case "popular":
          setIsLoading(false);
          setPopularMovies(res.data.results);
          break;
        case "top_rated":
          setIsLoading(false);
          setTopMovies(res.data.results);
          break;
        case "now_playing":
          setIsLoading(false);
          setNowMovies(res.data.results);
          break;
        case "upcoming":
          setIsLoading(false);
          setUpcomingMovies(res.data.results);
          break;
        default:
          return null;
      }
    }
    getMovies('popular',page);
    getMovies('top_rated',page);
    getMovies('now_playing',page);
    getMovies('upcoming',page);
  }, [page]);
  return (
    <div className="app">
      <Router>
        <Navbar/>
        <Routes>
          <Route index element={<Home  isLoading={isLoading} setPage={setPage} popularMovies={popularMovies} topMovies={topMovies} nowMovies={nowMovies} upcomingMovies={upcomingMovies} />} />
          <Route path='/movies/popular' element={<SingleCategory isLoading={isLoading} page={page} setPage={setPage}  header="Popular Movies" movies={popularMovies} />} />
          <Route path='/movies/top_rated' element={<SingleCategory isLoading={isLoading} page={page} setPage={setPage} header="Top Rated Movies" movies={topMovies} />} />
          <Route path='/movies/now_playing' element={<SingleCategory isLoading={isLoading} page={page} setPage={setPage} header="Now Playing Movies" movies={nowMovies} />} />
          <Route path='/movies/upcoming' element={<SingleCategory isLoading={isLoading} page={page} setPage={setPage} header="Coming Soon" movies={upcomingMovies} />} />
          <Route path='/movie/:id' element={<SingleMovie setIsModal={setIsModal} page={page} setModalImage={setModalImage}/>} />
          <Route path='actor/:id' element={<SingleActor/>} />
        </Routes>
        <AnimatePresence>
        {isModal && (
          <Modal setIsModal={setIsModal} isModal={isModal} modalImage={modalImage} setModalImage={setModalImage}/>
        )}
        </AnimatePresence>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;
