import React from 'react'
import Button from './Button';
import MaxHeap from './MaxHeap';
import MinHeap from './MinHeap';

const SimplifyDebt = ({members}) => {
    const handleClick = ()=>{
        // finding all possible subsets of the given array
        const findSubsets = (subset,netChange,output, sum,index) =>{
            if(index == netChange.length){
                if(sum == 0 && output.length != 0) subset.push(output);
                return;
            }
            findSubsets(subset,netChange,[...output], sum, index+1);
            output.push(netChange[index]);
            findSubsets(subset,netChange,[...output], sum + netChange[index].netBalance, index+1);
        }

        // reduce the array to groups of elements with sum = 0
        const findMinTransactions = (netChange,output)=>{
            if(netChange.length == 0){
                if(output.length > groups.length){
                    groups = output
                }
            }
            const possibleSubsets = []
            findSubsets(possibleSubsets,netChange,[],0,0)
            possibleSubsets.forEach(subset =>{
                const remaining = [...netChange].filter(el=> !subset.includes(el))
                findMinTransactions(remaining,[...output,subset])
            })
        }
        let groups = []
        const list = members.filter(member=> member.netBalance != 0)
        findMinTransactions(list,[])
        // for each group, create transactions using max heaps
        const transactions = []
        groups.forEach(group=>{
            const givers = new MaxHeap()
            const recievers = new MinHeap();
            group.forEach(member=>{
                if(member.netBalance < 0) recievers.add(member)
                else givers.add(member)
            })
            while(!givers.isEmpty() && !recievers.isEmpty()){
                let giver = givers.extractMax();
                let reciever = recievers.extractMin();
                console.log(giver,reciever);
                if(giver.netBalance == reciever.netBalance){
                    transactions.push({giver:giver.name,reciever:reciever.name,amount: giver.netBalance});
                }else if(giver.netBalance < -reciever.netBalance){
                    transactions.push({giver:giver.name,reciever:reciever.name,amount: giver.netBalance});
                    recievers.add({...reciever, netBalance: reciever.netBalance + giver.netBalance});
                }else{
                    transactions.push({giver:giver.name,reciever:reciever.name,amount: -reciever.netBalance});
                    givers.add({...giver, netBalance: reciever.netBalance + giver.netBalance});
                }
            }
        })
        console.log(transactions)
    }
  return (
    <Button onClick={handleClick} plain full style="dark">Simplify Debt</Button>
  )
}

export default SimplifyDebt