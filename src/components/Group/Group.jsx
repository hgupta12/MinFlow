import { useLiveQuery } from 'dexie-react-hooks'
import React, { useState } from 'react'
import {Link, useNavigate, useParams} from 'react-router-dom'
import { db } from '../../db'
import Button from '../Button'
import MembersList from '../Members/MembersList'
import SimplifyDebt from '../SimplifyDebt'
import TransactionList from '../Transactions/TransactionList'

const Group = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const group = useLiveQuery(() => db.groups.get(parseInt(id)),[id])
    const [list,setList] = useState(true)
  return (
    <>{
        group && (
          <section className='mx-2 mt-2 font flex flex-col h-screen justify-between'>
            <div className='mb-auto'>
            <div className='flex items-start justify-between mb-6'>
              <div>
                <h1 className='text-2xl font-medium'> {group.name} </h1>
                <p className='text-sm font-normal'> {group.members.length} Members</p>
              </div>
            <Button type="button" style="light" onClick={()=>{navigate(`/groups/${group.id}/transaction/add`)}}>Add Expense</Button>
            </div>
            <div className='w-full flex items-end justify-between mb-4'>
              <button className={`flex-grow ${list && 'bg-gray-300'} p-1 border-r-2 border-r-black border-b-2 border-b-black`} onClick={()=> setList(true)}>Members</button>
              <button className={`flex-grow ${!list && 'bg-gray-300'} p-1  border-b-2 border-b-black`} onClick={()=> setList(false)}>History</button>
            </div>
          {list? <MembersList group={group}/> : <TransactionList id={group.id}/>}
            </div>
          <SimplifyDebt members={group.members}/>
          </section>
        )
    }
    </>
  )
}

export default Group