import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import Showcase from '../components/showcase/Showcase';
import Spinner from '../components/spinner/Spinner';
const SingleActor = () => {
    const location = useLocation();
    const actorID = location.pathname.split('/')[2];
    const [isLoading,setIsLoading] = useState(false);
    const [actorDetails, setActorDetails] = useState({});
    const [actorMovies, setActorMovies] = useState([]);
    // const actorMovies = actorDetails?.movie_credits?.cast;
    const [firstIndex,setFirstIndex] = useState(0);
    const [lastIndex,setLastIndex] = useState(20);
    useEffect(() => {
        const getActorDetails = async () => {
            setIsLoading(true);
            try {
                const res = await axios.get(`${process.env.REACT_APP_BASE_URI}/person/${actorID}?api_key=${process.env.REACT_APP_API_KEY}&append_to_response=movie_credits`)
                setActorDetails(res.data);
                setActorMovies(res.data.movie_credits.cast);
                setIsLoading(false);
            } catch (err) {
                console.log(err.message);
            }

        }
        getActorDetails();
    }, [actorID]);
    useEffect(() => {
        document.title = `${actorDetails.name} | Movie APP`
    }, [actorDetails.name]);


    // const increaseIndexes = () =>{
    //     setFirstIndex(firstIndex + 20);
    //     setLastIndex(lastIndex < actorMovies.length ? lastIndex + 20 : actorMovies.length);
    // }
    // const decreaseIndexes = () =>{
    //     setFirstIndex(firstIndex > 20 ? firstIndex - 20 : 0);
    //     setLastIndex(lastIndex - 20);
    // }
    if(isLoading){
        return(
            <Spinner/>
        )
    }
    return (
        <div className="wrapper">
            <div className="single-actor">
                <header className='big-header'>
                    <div className="poster animate-bg">
                        <img src={`${process.env.REACT_APP_IMAGE_BASE_URI}/${actorDetails.profile_path}`} alt={`${actorDetails.name}-profile`} />
                    </div>
                    <div className="data">
                        <h1>{actorDetails.name}</h1>
                        <p><span>Brithday:</span> {actorDetails.birthday}</p>
                        <p><span>Overview:</span> {actorDetails.biography?.length > 500 ? actorDetails.biography.slice(0,500) + ' ...': actorDetails.biography}</p>
                        <p><span>Job:</span> {actorDetails.known_for_department}</p>
                    </div>
                </header>
                <Showcase header={`${actorDetails.name} Movies`} moviescategory={actorMovies.slice(firstIndex,lastIndex)} />
                {/* {
                    actorMovies.length > lastIndex - firstIndex && 
                        lastIndex  < actorMovies.length ? 
                        (
                        <button className="show-more" onClick={() => increaseIndexes()}>
                            <span>Show More <FaChevronDown/></span> 
                        </button>
                        ) 
                        : (
                            <button className='show-more'><span>The End...</span></button>
                        )
                } */}
            </div>
        </div>
    )
}

export default SingleActor;