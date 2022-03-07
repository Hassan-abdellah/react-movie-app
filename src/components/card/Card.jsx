import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Genre from '../genre/Genre';
import { MdTouchApp } from 'react-icons/md';
import './card.css';
const Card = ({ movie }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [movieDetails, setMovieDetails] = useState([]);
    const [isDataActive, setIsDataActive] = useState(false);
    useEffect(() => {
        const getMovieDetails = async () => {
            setIsLoading(true);
            const res = await axios.get(`${process.env.REACT_APP_BASE_URI}/movie/${movie.id}?api_key=${process.env.REACT_APP_API_KEY}`);
            setMovieDetails(res.data);
            setIsLoading(false)
        }
        getMovieDetails();
    }, [movie.id]);
    return (
        <div className="card">
            {!isLoading && (
                <div className="touch-icon" onClick={() => setIsDataActive(!isDataActive)}>
                    <MdTouchApp />
                </div>
            )}
            <Link to={`/movie/${movie.id}`}>
                <div className="movie-poster animate-bg">
                    {!isLoading && (
                        <img src={`${process.env.REACT_APP_IMAGE_BASE_URI}/${movie.poster_path}`} alt={`${movie.title}-poster`} />
                    )}
                </div>
            </Link>
            <div className={isDataActive ? "movie-data active" : "movie-data"}>
                <h1>{movie.title} <span>({movieDetails?.release_date?.split('-')[0]})</span></h1>
                <div className="genres-container">
                    {movieDetails?.genres?.slice(0, 2)?.map((genre, index) => (
                        <Genre key={index} genre={genre} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Card