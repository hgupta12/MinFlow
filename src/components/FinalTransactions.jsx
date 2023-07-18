import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Button from './Button'
import Heading from './Heading'

const Transaction = ({transaction})=>{

    return (
        <div className='flex items-center justify-between py-1'>
            <div className='flex items-center justify-between flex-grow pr-10'>
            <p className='text-xl'>{transaction.giver}</p>
            <img src="/arrow-right.svg" alt="owes" className='w-8' />
            <p className='text-xl'>{transaction.reciever}</p>
            </div>
            <p className='text-2xl font-semibold'> &#8377; {transaction.amount}</p>
        </div>
    )
}

const FinalTransactions = () => {
    const {state} = useLocation()
    const navigate = useNavigate()
    const [transactions, setTransactions] = useState([]);

    useEffect(()=>{setTransactions(state)},[state])
  return (
    <section className='mx-2'>
    <div className='flex justify-end'>
        <Button style="dark" onClick={()=>navigate(-1)} plain> Back</Button>
      </div>
        <Heading content="Final"/>
        {state && state.map(transaction=>
            (<Transaction transaction={transaction}/>)
        )}
    </section>
  )
}

export default FinalTransactions