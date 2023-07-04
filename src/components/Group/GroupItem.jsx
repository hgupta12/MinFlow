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
    <div>
      <div>
        <Link to={`/groups/${group.id}`}>
          <h1> {group.name} </h1>
        </Link>
        <p> </p>
        <p> {group.members.length} </p>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  )
}

export default GroupItem