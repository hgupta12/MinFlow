import { useLiveQuery } from 'dexie-react-hooks'
import React from 'react'
import {Link, useParams} from 'react-router-dom'
import { db } from '../../db'
import TransactionList from '../Transactions/TransactionList'

const Group = () => {
    const { id } = useParams()
    const group = useLiveQuery(() => db.groups.get(parseInt(id)),[id])
  return (
    <div>{
        group && (
          <>
            <div>
            <h1> {group.name} </h1>
            <p> {group.members.length} Members</p>
            </div>
          <Link to={`/groups/${id}/transaction/add`}> Add Transaction</Link>
          <TransactionList id={group.id}/>
          </>
        )
    }
    </div>
  )
}

export default Group