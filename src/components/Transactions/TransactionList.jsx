import { useLiveQuery } from 'dexie-react-hooks'
import React from 'react'
import { useState } from 'react'
import { db } from '../../db'
import Modal from '../Modal'

const Transaction = ({transaction}) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <Modal showModal={showModal} setShowModal={setShowModal} transaction={transaction}/>
    <div className='bg-gray-300 mb-3 px-2 py-3 cursor-pointer' onClick={()=>{setShowModal(true)}}>
      <div className='flex items-start justify-between'>
          <p className='text-lg'>{transaction.payer}</p>
          <div className='flex flex-col justify-between'>
          <p> &#8377; {transaction.amount} </p>
          <p className='text-sm'>for {transaction.payee.length}</p>
          </div>
      </div>
      </div>
    </>
  )
}
const TransactionList = ({id}) => {
  const transactions = useLiveQuery(() => db.transactions.where("groupId").equals(id).toArray())
  return (
    <>
    <div>

    {transactions && transactions.map(t=>(
      <Transaction key={t.id} transaction={t}/>
    ))}
    </div>
    </>
  )
}

export default TransactionList