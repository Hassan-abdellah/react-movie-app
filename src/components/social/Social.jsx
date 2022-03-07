import React from 'react'
import './social.css';
import { RiFacebookFill, RiTwitterFill, RiInstagramFill} from 'react-icons/ri';
const Social = () => {
    return (
        <ul className="social">
            <li>
                <RiFacebookFill />
            </li>
            <li>
                <RiTwitterFill />
            </li>
            <li>
                <RiInstagramFill />
            </li>
        </ul>
    )
}

export default Social