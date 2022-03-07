import React from 'react'
import './spinner.css';
import Loader from './loading.svg'
const Spinner = () => {
    return (
        <div className="wrapper">
            <div className="spinner-container">
                <img src={Loader} className="spinner" alt="loader-spinner" />
            </div>
        </div>
    )
}

export default Spinner