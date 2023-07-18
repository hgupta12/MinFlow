import React, { useEffect, useState } from "react";
import Select from "react-select";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../../db";
import Button from "../Button";
import Heading from "../Heading";

const CreateTransaction = () => {
  const { id } = useParams();
  const navigate = useNavigate()
  const [options, setOptions] = useState([]);
  const [selectedPayer, setSelectedPayer] = useState(null);
  const [selectedPayees, setSelectedPayees] = useState([]);
  const [amount, setAmount] = useState(null);
  const [members, setMembers] = useState([]);
  const [group, setGroup] = useState();
  const getMembers = async () => {
    try {
      const data = await db.groups.get(parseInt(id));
      setGroup(data);
      setMembers(data.members);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getMembers();
  }, []);

  useEffect(() => {
    const data = [];
    members.map((member) => {
      data.push({ label: member, value: member });
    });
    setOptions(data);
  }, [members]);

  useEffect(() => {
    setSelectedPayees([selectedPayer]);
  }, [selectedPayer]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const amountPerPerson = amount/selectedPayees.length
    const payees = selectedPayees.map(payee => payee['value'])
    const payer = selectedPayer['value']
    try {
      db.transaction('rw',db.groups,db.transactions, async ()=>{
        // 1. Add this payment to transactions
        await db.transactions.add({
          groupId: parseInt(id),
          payer,
          payee: payees,
          amount
        })
        // 2. Update Group Graph
        const graph = group.graph || new Map()
        payees.forEach(payee=>{
          if(payee != payer){
            if(!graph.has(payer))
              graph.set(payer,new Map())
              if(!graph.has(payee))
              graph.set(payee,new Map())
            if(graph.get(payer).has(payee)){
              const cur = parseInt(graph.get(payer).get(payee));
              graph.get(payer).set(payee, cur - amountPerPerson)
              graph.get(payee).set(payer, -cur + amountPerPerson)
            }
            else{
              graph.get(payer).set(payee, -amountPerPerson)
              graph.get(payee).set(payer, amountPerPerson)
            }
          }
        })
        await db.groups.update(parseInt(id),{graph})

      })
      navigate(`/groups/${id}`)
    } catch (error) {
      console.log(error)
    }
  };
  return (
    <section className="mx-2 mt-6">
      <div className='flex justify-end'>
        <Button style="dark" onClick={()=>navigate(-1)} plain> Back</Button>
      </div>
      <Heading content={"add expense"}/>
      {options && (
        <div className="mt-6">

        <form onSubmit={handleSubmit}>
          <Select
            defaultValue={selectedPayer}
            onChange={setSelectedPayer}
            options={options}
            value={selectedPayer}
            placeholder="Select Payer"
            className="mb-4"
            isSearchable={true}
            />
          <Select
            defaultValue={selectedPayees}
            onChange={setSelectedPayees}
            options={options}
            value={selectedPayees}
            placeholder="Select Payee(s)"
            isSearchable={true}
            className="mb-4"
            isMulti
            />
          <input
            inputmode="numeric" pattern="[0-9]*" type="text"
            placeholder="Amount..."
            onChange={(e) => setAmount(parseInt(e.target.value))}
            className="w-full outline-none p-2 border border-1 border-gray-300 rounded-md mb-4"
          />
          <Button type="submit" full plain style="dark">Add</Button>
        </form>
            </div>
      )}
    </section>
  );
};

export default CreateTransaction;
