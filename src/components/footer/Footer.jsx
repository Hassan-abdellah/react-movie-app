import React from 'react'
import './footer.css';
import { Link } from 'react-router-dom';
import Social from '../social/Social';

const Footer = () => {
  return (
      <div className="footer-container">
        <div className="wrapper">
            <footer className="footer">
                <Link className='logo' to="/">Movie APP</Link>
                <Social/>
            </footer>    
            <p className='copyright'>This Application is made with ❤️ by <a href="https://developers.themoviedb.org/3" target="_blank" rel="noreferrer" >THMD</a></p>
        </div>
        </div>
    
  )
}

export default Footer;