import React, {useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import {RiSearchLine } from 'react-icons/ri';
import './navbar.css';
import axios from 'axios';
import { AnimatePresence,motion } from 'framer-motion';
import Social from '../social/Social';
const Navbar = () => {
    const [query, setQuery] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [isLoading,setIsLoading] =useState(false);
    const [isSearchActive,setIsSearchActive] =useState(false);
    const searchMovie = async () => {
        setIsLoading(true);
        const res = await axios.get(`${process.env.REACT_APP_BASE_URI}/search/movie?api_key=${process.env.REACT_APP_API_KEY}&lang=en&query=${query}`);
        setIsLoading(false);
        setSearchResult(res.data.results);
    }
    const inputRef = useRef();
    useEffect(() => {
        const getClickOutside = (e) => {
            if (isSearchActive && e.target === inputRef.current) {
                setIsSearchActive(false);
            }
        };
        document.addEventListener("click", getClickOutside);
        return () => {
            document.removeEventListener("click", getClickOutside);
        };
    }, [isSearchActive]);
    return (
        <div className="navbar-container">
            <div className="wrapper">
                <nav className="navbar">
                    <Link to="/" className="logo">Movie App</Link>
                    <div style={{overflow:searchResult.length <= 0 && 'hidden'}}  className={ isSearchActive ? "input-container active" :"input-container"} ref={inputRef}>
                        <input type="search" id="search" value={query} onChange={(e) => setQuery(e.target.value)} onKeyDown={() => searchMovie()} required />
                        <label htmlFor="search">🔍 Search Movies...</label>
                        <AnimatePresence>
                            {query && !isLoading && (
                            <motion.ul 
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            exit={{opacity: 0}}
                            transition={{easings:"ease-in-out",duration:"0.75"}}
                            className="search-result">
                                {searchResult.length > 0 ?
                                searchResult.map((movie, index) => (
                                    <li key={index}>
                                        <Link to={`/movie/${movie.id}`} onClick={() => {setSearchResult([]); setIsSearchActive(false)}}>
                                            <img className='animate-bg' src={`${process.env.REACT_APP_IMAGE_BASE_URI}/${movie.poster_path}`} alt={`${movie.title}-poster`} />
                                            <h4>{movie.title}<span>({movie?.release_date?.split('-')[0]})</span></h4>
                                        </Link>
                                    </li>
                                )) : (
                                    <h1>Loading...</h1>
                                )
                                }
                            </motion.ul>
                            )}
                        </AnimatePresence>
                    </div>
                    <Social/>
                    <div className="search-icon" onClick={() => setIsSearchActive(!isSearchActive)}>
                        <RiSearchLine/>
                    </div>
                </nav>

            </div>
        </div>
    )
}

export default Navbar