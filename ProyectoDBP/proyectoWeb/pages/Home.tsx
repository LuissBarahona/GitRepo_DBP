import React from 'react';
import NavBar from '../components/NavBar';

const Home: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-100">
            <NavBar />
            <div className="flex items-center justify-center h-full">
                <div className="text-center p-8 bg-white shadow-lg rounded-lg">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to Our Food Social Network</h1>
                    <p className="text-lg text-gray-600">Discover and share your favorite recipes with our community!</p>
                </div>
            </div>
        </div>
    );
};

export default Home;