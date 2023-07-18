import React from 'react';
import {Routes,Route} from 'react-router-dom'

import CreateGroup from './components/Group/CreateGroup';
import Group from './components/Group/Group';
import GroupList from './components/Group/GroupList';

import CreateTransaction from './components/Transactions/CreateTransaction';

import Navbar from './components/Navbar';
import FinalTransactions from './components/FinalTransactions';

export default function App() {
  
  return (
<>
    <Navbar/>
    <Routes>
      <Route index path='/groups' element={<GroupList/>}/>
      <Route path='/groups/create' element={<CreateGroup/>}/>
      <Route path='/groups/:id' element={<Group/>}/>
      <Route path='/groups/:id/transaction/add' element={<CreateTransaction/>}/>
      <Route path='/groups/transaction/simple' element={<FinalTransactions/>}/>
    </Routes>
</>
  )
}
