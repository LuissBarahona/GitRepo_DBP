// api.ts

import axios from 'axios';

// Define the base URL for the backend
const BASE_URL = 'http://localhost:8080';

// Define interfaces based on the backend entities
export interface User {
    userId: string;
    email: string;
    name: string;
    userType: string;
    role: string;
    createdAt: string;
    updatedAt: string;
}

export interface JwtAuthResponse {
    token: string;
}

export interface LoginReq {
    email: string;
    password: string;
}

export interface RegisterReq {
    email: string;
    password: string;
    name: string;
    userType: string;
}

// Create methods to interact with the backend

// Register a new user
export const register = async (registerReq: RegisterReq): Promise<JwtAuthResponse> => {
    const response = await axios.post<JwtAuthResponse>(`${BASE_URL}/auth/register`, registerReq);
    return response.data;
};

// Login a user
export const login = async (loginReq: LoginReq): Promise<JwtAuthResponse> => {
    const response = await axios.post<JwtAuthResponse>(`${BASE_URL}/auth/login`, loginReq);
    return response.data;
};

// Get user details
export const getUserDetails = async (userId: string): Promise<User> => {
    const response = await axios.get<User>(`${BASE_URL}/users/${userId}`);
    return response.data;
};

// Example usage
// (async () => {
//     try {
//         const loginResponse = await login({ email: 'test@example.com', password: 'password' });
//         console.log('Login successful:', loginResponse.token);

//         const userDetails = await getUserDetails('userId');
//         console.log('User details:', userDetails);
//     } catch (error) {
//         console.error('Error:', error);
//     }
// })();