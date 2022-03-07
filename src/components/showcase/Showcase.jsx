import React from 'react'
import { Link } from 'react-router-dom'
import Card from '../card/Card'

const Showcase = ({moviescategory, header,url}) => {
    return (
        <section className="showcase-movies">
            <header>
                <h3>{header}</h3>
                {url !== undefined ? (<Link to={`/movies/${url}`}>Browse More</Link>) : (<Link to="/">Back Home</Link>)}
            </header>
            <section className="grid-section">
                {url !== undefined ? moviescategory.slice(0, 4).map((movie, index) => (
                    <Card key={index} movie={movie} />
                )) : moviescategory.map((movie, index) => (
                    <Card key={index} movie={movie} />))}
            </section>
        </section>
    )
}

export default Showcase