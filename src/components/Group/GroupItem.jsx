import React from 'react'
import { Link } from 'react-router-dom'
import {db} from '../../db'

const GroupItem = ({group}) => {
  const handleDelete =async  ()=>{
    db.transaction('rw',db.groups, db.transactions, async ()=>{
      await db.transactions.where("groupId").equals(group.id).delete()
      await db.groups.delete(group.id)
    })
  }  
  return (
    <div className='mb-4 bg-slate-800 p-3 rounded-lg text-white'>
      <div className='flex items-center justify-between mb-2'>
        <Link to={`/groups/${group.id}`}>
          <h3 className='uppercase font-medium tracking-wider'> {group.name} </h3>
        </Link>
        <button onClick={handleDelete}>
          <img src="/trash.svg" alt="Delete" className='w-4 text-white' />
        </button>
      </div>
        <p className='text-sm font-light'> {group.members.length} members </p>
    </div>
  )
}

export default GroupItem