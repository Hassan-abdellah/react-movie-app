import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Genre from '../components/genre/Genre';
import Spinner from '../components/spinner/Spinner';
const SingleMovie = ({setModalImage, setIsModal}) => {
    const location = useLocation();
    const movieID = location.pathname.split('/')[2];
    const [isLoading, setIsLoading] = useState(false);
    const [movieDetails, setMovieDetails] = useState([]);
    const [movieActors, setMovieActors] = useState([]);
    const [movieImages, setMovieImages] = useState({});
    useEffect(() => {
        const getMovieDetails = async () => {
            setIsLoading(true);
            const res = await axios.get(`${process.env.REACT_APP_BASE_URI}/movie/${movieID}?api_key=${process.env.REACT_APP_API_KEY}&append_to_response=credits,images`);
            setMovieDetails(res.data);
            setMovieActors(res.data.credits.cast);
            setMovieImages(res.data.images);
            setIsLoading(false)
        }
        getMovieDetails();
    }, [movieID]);
    useEffect(() => {
        document.title = `${movieDetails.title} | Movie APP`;
    },[movieDetails.title]);
    if(isLoading) {
        return (
            <Spinner/>
        )
    }
    return (
        <div className="wrapper">
            <div className="single-movie">
                <header className='big-header'>
                    <div className="poster animate-bg">
                        <img src={`${process.env.REACT_APP_IMAGE_BASE_URI}/${movieDetails?.poster_path}`} alt={`${movieDetails.title}-poster`} />
                    </div>
                    <div className="data">
                        <h1>{movieDetails.title}</h1>
                        <div className="genres-container">
                            {movieDetails.genres?.map((genre, index) => (
                                <Genre key={index} genre={genre} />
                            ))}
                        </div>
                        <p><span>Release Date:</span> {movieDetails.release_date}</p>
                        <p><span>overview:</span> {movieDetails.overview}</p>
                        <p><span>Languages: </span>{movieDetails.spoken_languages?.map((lang,index) => (
                            <span key={index} className='lang'> {lang.name} ,</span>
                        ))}</p>
                    </div>
                </header>
                <section className="single-movie-content">
                    <div className="single-movie-actors">
                        <h1>Actors:</h1>
                        <div className="movie-actors grid-section">
                            {movieActors?.slice(0,5).map((actor,index) => (
                                <Link key={index} to={`/actor/${actor.id}`}>
                                <div className="movie-actor">
                                    <img className="animate-bg" src={`${process.env.REACT_APP_IMAGE_BASE_URI}/${actor?.profile_path}`} alt={`${actor.name}`} />
                                    <div className="actor-data">
                                        <h4>{actor.name.length > 15 ? actor.name.slice(0,15) : actor.name}</h4>
                                        <span>{actor.character.length > 15 ? actor.character.slice(0,15) : actor.character}</span>
                                    </div>
                                </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                    <div className="movie-images grid-section">
                            { movieImages?.backdrops?.length > 0 ? 
                                movieImages?.backdrops?.slice(0,10).map((backdrop,index) => (
                                <div className="image animate-bg" key={index} onClick={() => {
                                    setIsModal(true);
                                    setModalImage(`${process.env.REACT_APP_IMAGE_BASE_URI}/${backdrop?.file_path}`);
                                }} >
                                    {backdrop.file_path && (
                                        <img src={`${process.env.REACT_APP_IMAGE_BASE_URI}/${backdrop?.file_path}`} alt="" />
                                    )}
                                </div>
                            )) : 
                                movieImages?.poster?.slice(0,10).map((poster,index) => (
                                    <div className="image animate-bg" key={index} onClick={() => {
                                        setIsModal(true);
                                        setModalImage(`${process.env.REACT_APP_IMAGE_BASE_URI}/${poster?.file_path}`);
                                    }} >
                                        {poster.file_path && (
                                            <img src={`${process.env.REACT_APP_IMAGE_BASE_URI}/${poster?.file_path}`} alt="" />
                                        )}
                                    </div>
                                ))
                            }
                    </div>
                </section>
            </div>
        </div>
    )
}

export default SingleMovie