import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { UserContext } from './context';
import NavBar from './components/navbar';
import Home from './components/home';
import CreateAccount from './components/createaccount';
import Login from './components/login';
import AllData from './components/alldata';
import Deposit from './components/deposit';
import Withdraw from './components/withdraw';
import Balance from './components/balance';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <NavBar />
    <UserContext.Provider>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="createaccount" element={<CreateAccount />} />
      <Route path="/login" element={<Login />} />
      <Route path="/deposit" element={<Deposit />} />
      <Route path="/withdraw" element={<Withdraw />} />
      <Route path="/balance" element={<Balance />} />
      <Route path="/alldata" element={<AllData />} />
    </Routes>
    </UserContext.Provider>
  </BrowserRouter>
);


