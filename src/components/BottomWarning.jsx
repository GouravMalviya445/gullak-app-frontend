import React from 'react'
import { Link } from 'react-router-dom';

const BottomWarning = ({ className, warningText, buttonText,     to }) => {
    return (
        <p className={`${className} mt-5`}>
            {warningText}
            <Link className='text-blue-500 font-bold' to={to}>
                {" " + buttonText}
            </Link>
        </p>
    )
}

export default BottomWarning;