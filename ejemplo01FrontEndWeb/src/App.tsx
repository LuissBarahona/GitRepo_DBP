import { useState } from 'react'
import './App.css'
import NavBar from "../components/NavBar"
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '../pages/Login';
import Register from '../pages/Register'; 
import Home from '../pages/Home'; 
import Signup from '../pages/Register';
import Inicio from '../pages/Inicio';
import DashBoard3 from '../pages/Dashboard3';

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
        <NavBar /> 
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<DashBoard3 />} />
            <Route path="/login" element={<Login />} />
            <Route path="/inicio" element={<Inicio/>} />
            
           
        </Routes>
    </Router>
  );

}

export default App



