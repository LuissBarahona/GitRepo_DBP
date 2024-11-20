import React, { useState } from 'react';
import { register, JwtAuthResponse, RegisterReq } from '../src/Api';

const Register: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [userType, setUserType] = useState('');
    const [error, setError] = useState('');
    const [token, setToken] = useState('');

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const registerReq: RegisterReq = { email, password, name, userType };

        try {
            const response: JwtAuthResponse = await register(registerReq);
            setToken(response.token);
            setError('');
        } catch (err) {
            setError('Registration failed. Please try again.');
        }
    };

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>User Type:</label>
                    <input
                        type="text"
                        value={userType}
                        onChange={(e) => setUserType(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Register</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {token && <p>Registration successful! Token: {token}</p>}
        </div>
    );
};

export default Register;