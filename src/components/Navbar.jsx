import React from 'react'
import {Link} from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className='mx-2 my-1 flex items-center justify-between'>
      <Link to="/">
        <h1 className='text-3xl font-bold'>MinFlow</h1>
      </Link>
      <div
            className="space-y-1 cursor-pointer"
          >
            <span className="block h-0.5 w-8 bg-slate-900"></span>
            <span className="block h-0.5 w-8 bg-slate-900"></span>
            <span className="block h-0.5 w-8 bg-slate-900"></span>
          </div>
        {/* <Link to="/groups">Groups</Link> */}
    </nav>
  )
}

export default Navbar