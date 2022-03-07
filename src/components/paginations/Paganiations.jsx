import React from 'react'
import './paginations.css';
const Paganiations = ({setSearchparams, page}) => {
    return (
        <ul className="paginations">
            {Array.from(Array(10)).map((item, index) => (
                <li key={index} className={page === index + 1 ? 'active' : ''} onClick={() => setSearchparams({ page: index + 1 })}>
                    {index + 1}
                </li>
            ))}
        </ul>
    )
}

export default Paganiations