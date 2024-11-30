import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './login/login';
import logo from './logos/mecwinlogo.png';
import Dashboard from './dashboard/dashboard';
import Product from './product/product';
import Admin from './admin/admin';
import './App.css';

function App() {
  return (
    <Router>
        {/* <Dashboard><img src={logo} /></Dashboard>
        */}
      
     
    <Routes>
    <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/product" element={<Product/>} />
      <Route path="/admin" element={<Admin/>} />
      

    </Routes>
  </Router>

    
     
  );
}

export default App;
