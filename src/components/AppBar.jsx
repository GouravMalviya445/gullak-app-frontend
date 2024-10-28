import React from 'react'
import { Link } from 'react-router-dom';

const AppBar = React.memo(({ className }) => {

    return (
        <div className={`flex p-3 px-5 items-center justify-between shadow-md ${className}`}>
            {/* Logo section */}
            <div>
                <Link className='text-blue-900 font-bold' to={"/dashboard"}>
                    Gullak App
                </Link>
            </div>

            <div className='flex items-center gap-3'>
                <p className='font-bold font-serif text-stone-500'>Hello</p>

                <Link to={"/profile"}>
                    <img className='h-9 drop-shadow-xl rounded-full' src="/userAvatar.svg" alt="avatar" />
                </Link>
            </div>

        </div>
    )
})

export default AppBar;