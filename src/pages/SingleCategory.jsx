import React, { useEffect } from 'react'
import Showcase from '../components/showcase/Showcase'
import { useSearchParams } from 'react-router-dom';
import Spinner from '../components/spinner/Spinner';
import Paganiations from '../components/paginations/Paganiations';
const SingleCategory = ({ header, movies, setPage,page, isLoading }) => {
    const [searchParams, setSearchparams] = useSearchParams();
    let pagenumber = parseInt(searchParams.get('page'));
    useEffect(() => {
        if (pagenumber) {
            setPage(pagenumber);
        }
        else {
            setPage(1);
        }
    }, [pagenumber, setPage]);
    useEffect(() => {
        document.title = `${header} | Movie APP`;
    }, [header]);
    if (isLoading) {
        return (
            <Spinner/>
        )
    }
    return (
        <div className="wrapper">
            <Showcase header={header} moviescategory={movies} />
            <Paganiations setSearchparams={setSearchparams} page={page}/>
        </div>
    )
}

export default SingleCategory