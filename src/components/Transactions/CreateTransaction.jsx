import React, { useEffect, useState } from "react";
import Select from "react-select";
import { useParams } from "react-router-dom";
import { db } from "../../db";

const CreateTransaction = () => {
  const { id } = useParams();
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
        console.log(graph)
      })
      console.log("Transaction added!")
    } catch (error) {
      console.log(error)
    }
  };
  return (
    <>
      <div>Add Transaction</div>
      {options && (
        <form onSubmit={handleSubmit}>
          <Select
            defaultValue={selectedPayer}
            onChange={setSelectedPayer}
            options={options}
            value={selectedPayer}
            placeholder="Select Payer"
            className="w-40"
            isSearchable={true}
          />
          <Select
            defaultValue={selectedPayees}
            onChange={setSelectedPayees}
            options={options}
            value={selectedPayees}
            placeholder="Select Payee(s)"
            className="w-48"
            isSearchable={true}
            isMulti
          />
          <input
            type="number"
            placeholder="Amount..."
            onChange={(e) => setAmount(parseInt(e.target.value))}
          />
          <button type="submit">Add</button>
        </form>
      )}
    </>
  );
};

export default CreateTransaction;
