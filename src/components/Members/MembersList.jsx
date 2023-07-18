import React, { useEffect, useState } from 'react'

const Member = ({member}) =>{
  const balanceClass = member.netBalance == 0? "":
   member.netBalance < 0? "text-green-600":"text-red-500"
  return (
    <div className=" py-2 px-4 mb-1 flex items-center justify-between text-lg">
    <p>{member.name}</p>
    <p className={`text-xl font-semibold ${balanceClass}`}> &#8377; {Math.abs(member.netBalance)}</p>
  </div>
  )
}
const MembersList = ({members}) => {
  return (
    <div>
      {members.map(member=>(
       <Member key={member.name} member={member}/>
      ))}
    </div>
  )
}

export default MembersList