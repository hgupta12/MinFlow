import React, { useState } from 'react'
import {db} from '../../db'
import { useNavigate} from 'react-router-dom'
import Button from '../Button'
import Heading from '../Heading'
import Input from '../Input'

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
    <section className='mx-2'>
      <div className='flex justify-end'>
        <Button style="dark" onClick={()=>navigate(-1)} plain> Back</Button>
      </div>
      <div className='mt-4'>
        <Heading content={"create group"}/>
        <form onSubmit={handleSubmit} className="mt-6">
            <Input type="text" placeholder="Name" onChange={e=> setName(e.target.value)}/>
            <Input type="textarea" placeholder="Enter member names (space seperated)" onChange={e=> setMembers(e.target.value)}/>
            <Button type="submit" style="dark" full plain>Save</Button>
        </form>
      </div>
    </section>
  )
}

export default CreateGroup 