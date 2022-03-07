import React from 'react'
import './genre.css';
const Genre = ({genre}) => {
  return (
        <div className='genre-pill'>{genre.name}</div>
  )
}

export default Genre;