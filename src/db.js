import Dexie from "dexie"

export const db = new Dexie('minflow')
db.version(1).stores({
    'groups':'++id,name,members,graph,minimized',
    'transactions': '++id,groupId,payer,payee,amount',
})
