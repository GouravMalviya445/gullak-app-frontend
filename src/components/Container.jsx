import React from 'react'

const Container = ({ children, className }) => {
    return (
        <div className={`${className} mx-5`}>
            {children}
        </div>
    )
}

export default Container