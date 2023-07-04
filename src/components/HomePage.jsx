import React from 'react'
import { Link } from 'react-router-dom'
const HomePage = () => {
  return (
    <>
    <div>HomePage</div>
    <Link to="/groups/create">Create Group</Link>
    </>
  )
}

export default HomePage