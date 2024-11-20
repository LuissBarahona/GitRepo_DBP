import React from 'react';
import { Link } from 'react-router-dom';

const NavBar: React.FC = () => {
    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-2xl text-white">MyApp</h1>
                <div className="flex space-x-4">
                    <Link to="/" className="text-white hover:text-gray-400">Home</Link>
                    <Link to="/login" className="text-white hover:text-gray-400">Login</Link>
                    <Link to="/register" className="text-white hover:text-gray-400">Register</Link>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;