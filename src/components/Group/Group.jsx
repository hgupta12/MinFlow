import { useLiveQuery } from 'dexie-react-hooks'
import React, { useEffect, useState } from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import { db } from '../../db'
import Button from '../Button'
import MembersList from '../Members/MembersList'
import SimplifyDebtBtn from '../SimplifyDebtBtn'
import TransactionList from '../Transactions/TransactionList'

const Group = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const group = useLiveQuery(() => db.groups.get(parseInt(id)),[id])
    const [list,setList] = useState(true)

    const [members, setMembers] = useState([])

  useEffect(()=>{
    const list = []
    if(group){
      const graph = group.graph
      group.members.forEach(member=>{
        if(graph.has(member)){
          let net = 0
        for(let [_,amount] of graph.get(member)){
          net += amount
        }
        list.push({name:member, netBalance: net})
        }else list.push({name:member,netBalance: 0})
      })
      setMembers(list)
    }
  },[group])

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
          {list? <MembersList members={members}/> : <TransactionList id={group.id}/>}
            </div>
          <SimplifyDebtBtn members={members}/>
          </section>
        )
    }
    </>
  )
}

export default Group