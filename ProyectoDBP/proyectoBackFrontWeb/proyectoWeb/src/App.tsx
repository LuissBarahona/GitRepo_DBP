import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Home from '../pages/Home';
import Inicio from '../pages/Inicio';
import Inicio2 from '../pages/Inicio2';

import Chat from '../pages/Chat';

import Inicio3 from '../pages/Inicio3';


const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/inicio" element={<Inicio />} />
                <Route path="/inicio2" element={<Inicio2 />} />
                <Route path="/chat" element={<Chat />} />
                <Route path="/inicio3" element={<Inicio3 />} />
                
            </Routes>
        </Router>
    );
};

export default App;