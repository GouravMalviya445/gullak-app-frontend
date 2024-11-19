import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className='h-screen w-screen flex flex-col justify-center items-center gap-10'>

      <h1 className='text-4xl'>Welcome</h1>
      <div className='flex text-white font-bold space-x-3'>
        <button className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
          <Link to={"/signup"}>Signup</Link>
        </button>
        <button className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
          <Link to={"/signin"}>Login</Link>
        </button>
      </div>
    </div>
  )
}

export default Home