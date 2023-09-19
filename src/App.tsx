import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Wallet from './pages/Wallet';

function App() {
  return (
    <Routes>
      <Route element={ <Login /> } path="/" />
      <Route element={ <Wallet /> } path="/carteira" />
    </Routes>
  );
}

export default App;
