import React, { useState } from 'react'
import {db} from '../../db'
import {Navigate, useNavigate} from 'react-router-dom'

const CreateGroup = () => {
    const [name, setName] = useState("")
    const [members,setMembers] = useState("")

    const navigate = useNavigate();

    const handleSubmit = async (e) =>{
        e.preventDefault()
        const membersList = members.split(" ");
        const graph = new Map();
        const minimized = new Map();
        try {
          await db.groups.add({
            name,
            members: membersList,
            graph,
            minimized
          })
          setName("");
          setMembers("");
          alert("Group created!")
          navigate('/groups')
        } catch (error) {
          console.log(error)
        }
        

    }
  return (
    <>
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder='Group Name...' onChange={e=> setName(e.target.value)}/>
            <input type="text" placeholder='Members' onChange={e=> setMembers(e.target.value)}/>
            <button type="submit">Save</button>
        </form>
    </>
  )
}

export default CreateGroup 