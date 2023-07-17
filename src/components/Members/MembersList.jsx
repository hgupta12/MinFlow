import React, { useEffect, useState } from 'react'
import SimplifyDebt from '../SimplifyDebt'

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
const MembersList = ({group}) => {
  const [members, setMembers] = useState([])

  useEffect(()=>{
    const list = []
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
    console.log(list)
    setMembers(list)
  },[group])

  return (
    <div>
      {members.map(member=>(
       <Member key={member.name} member={member}/>
      ))}
    </div>
  )
}

export default MembersList