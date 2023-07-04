import { useLiveQuery } from 'dexie-react-hooks'
import React from 'react'
import { db } from '../../db'

const TransactionList = ({id}) => {
  const transactions = useLiveQuery(() => db.transactions.where("groupId").equals(id).toArray())
  return (
    <>
    <div>TransactionList</div>
    <div>

    {transactions && transactions.map(t=>(
      <div key={t.id}>
          <p>Payer: {t.payer}</p>
          <p>Payee: {t.payee.toString()}</p>
          <p>Amount: {t.amount} </p>
          <hr />
      </div>
    ))}
    </div>
    </>
  )
}

export default TransactionList