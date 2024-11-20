import React, { useState } from 'react';
import { login, JwtAuthResponse, LoginReq } from '../src/Api'

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [token, setToken] = useState('');

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const loginReq: LoginReq = { email, password };

        try {
            const response: JwtAuthResponse = await login(loginReq);
            setToken(response.token);
            setError('');
        } catch (err) {
            setError('Login failed. Please check your credentials.');
        }
    };

    return (
        <div>
            <h2>Login</h2>
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
                <button type="submit">Login</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {token && <p>Login successful! Token: {token}</p>}
        </div>
    );
};

export default Login;