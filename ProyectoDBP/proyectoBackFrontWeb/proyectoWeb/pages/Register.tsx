import React, { useState } from 'react';
import { register, JwtAuthResponse, RegisterReq } from '../src/Api';

// Global CSS reset styles
const styles = `
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  html, body, #root {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
`;

const Register: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [userType, setUserType] = useState('INFLUENCER'); // Default value
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
        <>
            
            {/* Inject global styles */}
            <style>{styles}</style>
            <div
                style={{
                    backgroundImage: `url('../src/assets/Img2.jpg')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    width: '100vw',
                    height: '100vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: '#fff',
                }}
            >

                {/* Botón FoodTails */}
                <a
                    href="/"
                    style={{
                        position: 'absolute',
                        top: '10px',
                        left: '10px',
                        background: '#8B4513',
                        color: '#fff',
                        padding: '10px 20px',
                        borderRadius: '5px',
                        textDecoration: 'none',
                        fontWeight: 'bold',
                        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.3)',
                        cursor: 'pointer',
                    }}
                >
                    FoodTails
                </a>
                
                <div
                    style={{
                        background: 'rgba(0, 0, 0, 0.7)',
                        padding: '30px',
                        borderRadius: '10px',
                        width: '90%',
                        maxWidth: '400px',
                        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
                    }}
                >
                    <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Register</h2>
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '5px' }}>Email:</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                style={{
                                    width: '100%',
                                    padding: '10px',
                                    borderRadius: '5px',
                                    border: '1px solid #ccc',
                                    outline: 'none',
                                }}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '5px' }}>Password:</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                style={{
                                    width: '100%',
                                    padding: '10px',
                                    borderRadius: '5px',
                                    border: '1px solid #ccc',
                                    outline: 'none',
                                }}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '5px' }}>Name:</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                style={{
                                    width: '100%',
                                    padding: '10px',
                                    borderRadius: '5px',
                                    border: '1px solid #ccc',
                                    outline: 'none',
                                }}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '5px' }}>User Type:</label>
                            <select
                                value={userType}
                                onChange={(e) => setUserType(e.target.value)}
                                required
                                style={{
                                    width: '100%',
                                    padding: '10px',
                                    borderRadius: '5px',
                                    border: '1px solid #ccc',
                                    outline: 'none',
                                    backgroundColor: '#fff',
                                    cursor: 'pointer',
                                }}
                            >
                                <option value="INFLUENCER">INFLUENCER</option>
                                <option value="ADMIN">ADMIN</option>
                            </select>
                        </div>
                        <button
                            type="submit"
                            style={{
                                background: '#8B4513',
                                color: '#fff',
                                padding: '10px',
                                borderRadius: '5px',
                                border: 'none',
                                cursor: 'pointer',
                                fontSize: '16px',
                            }}
                        >
                            Register
                        </button>
                    </form>
                    {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
                    {token && (
                        <p style={{ color: 'green', marginTop: '10px' }}>
                            Registration successful! Token: {token}
                        </p>
                    )}
                    {/* Link adicional */}
                    <div style={{ marginTop: '20px', textAlign: 'center' }}>
                        <p>
                            ¿Ya tienes una cuenta?{' '}
                            <a
                                href="/login"
                                style={{ color: '#4CAF50', textDecoration: 'none', fontWeight: 'bold' }}
                            >
                                Login
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Register;
