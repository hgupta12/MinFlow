const graph = new Map()

let netChange =  [
    ["Evans", -10],
    ["Cherie",-5],
    ["Sam",15],
    ["Ignacio",-10],
    ["Sean", -10],
    ["John", 20],
    ["Mike", 50],
    ["James", -50]
]

// let subset2 = []

// netChange.forEach(person=>{
//     const otherPerson = netChange.find((p)=>{
//         return p[1] === -person[1]
//     })
//     if(otherPerson){
//         subset2 = [...subset2,[person,otherPerson]];
//         netChange = netChange.filter(p => p!= person && p!= otherPerson)

//     }

// })
// console.log(subset2)

const possibleSubsets = []
const findSubsets = (subset,netChange,output, sum,index) =>{
    if(index == netChange.length){
        if(sum == 0 && output.length != 0) subset.push(output);
        return;
    }
    findSubsets(subset,netChange,[...output], sum, index+1);
    output.push(netChange[index]);
    findSubsets(subset,netChange,[...output], sum + netChange[index][1], index+1);
}

let transactions = []
const findMinTransactions = (netChange,output)=>{
    if(netChange.length == 0){
        if(output.length > transactions.length){
            transactions = output
        }
    }
    const possibleSubsets = []
    findSubsets(possibleSubsets,netChange,[],0,0)
    possibleSubsets.forEach(subset =>{
        const remaining = [...netChange].filter(el=> !subset.includes(el))
        findMinTransactions(remaining,[...output,subset])
    })
}

findMinTransactions(netChange,[])
transactions.forEach(transaction => console.log(transaction))



