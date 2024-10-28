import React from 'react'
import { useNavigate } from 'react-router-dom'

const User = React.memo(({ firstName, lastName, className, userId, ...props }) => {
    const navigate = useNavigate();
    const data = {
        firstName,
        lastName,
        userId
    }

    function handleClick(e) {
        console.log(e.target.id)
        navigate("/send", {
            state: data
        })
    }

    return firstName && lastName && (
        <div {...props} className={'flex items-center justify-between ' + className}>
            <div className='flex gap-3 items-center'>
                <span className='px-3 py-1 font-semibold text-lg rounded-full bg-blue-200'>{firstName[0]}</span>
                <h2 className='font-medium text-xl'>{`${firstName} ${lastName}`}</h2>
            </div>
            <button
                onClick={handleClick}
                type="button"
                className="text-white bg-gray-800 hover:bg-gray-900 font-medium rounded-full text-md px-4 py-1.5"
            >
                send money
            </button>
        </div>
    )
})

export default User