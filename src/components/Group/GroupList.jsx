import { useLiveQuery } from 'dexie-react-hooks'
import React from 'react'
import { db } from '../../db'
import GroupItem from './GroupItem'

const GroupList = () => {
  const groups = useLiveQuery(()=> db.groups.toArray(),[])
  return (
    <>
    <div>GroupList</div>
    {groups && groups.map(group=>(
        <GroupItem key={group.id} group={group}/>
    ))}
    </>
  )
}

export default GroupList