import { useLiveQuery } from 'dexie-react-hooks'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { db } from '../../db'
import Button from '../Button'
import Heading from '../Heading'
import GroupItem from './GroupItem'

const GroupList = () => {
  const navigate = useNavigate();
  const groups = useLiveQuery(()=> db.groups.toArray(),[])
  return (
    <section className='mx-2 pt-2'>
    <div className='flex items-center justify-between mb-4'>
    <Heading content="groups"/>
      <Button type="light" onClick={()=>{navigate('/groups/create')}}>
        <img src="/add.svg" alt="Add" className='w-4' />
      </Button>
    </div>
    {groups && groups.map(group=>(
        <GroupItem key={group.id} group={group}/>
    ))}
    </section>
  )
}

export default GroupList