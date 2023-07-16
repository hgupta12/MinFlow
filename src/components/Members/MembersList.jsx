import React, { useEffect, useState } from 'react'
import SimplifyDebt from '../SimplifyDebt'
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
      <h1>Members List</h1>
      {members.map(member=>(
        <div key={member.name}>
          <p>{member.name} = {member.netBalance}</p>
          <hr />
        </div>
      ))}
      <SimplifyDebt members={members}/>
    </div>
  )
}

export default MembersList