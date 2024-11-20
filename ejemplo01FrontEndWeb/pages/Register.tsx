import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useToken from "../hooks/useToken";
import { PostRegisterS } from "../src/Interfaces"; // Import a la estructura | DTO | interface
import { PostRegisterF } from "../src/Api"; // Import a la función que hace POST  /auth/register

function Register() {
  // Variables para el DTO
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("admin"); // Predeterminado a "admin"

  // Otras variables
  const { setToken } = useToken();
  const navigate = useNavigate();

  async function handleRegister() {
    //Crea un objeto user con los datos que el formulario entrega al hacer click en regístrate
    const user: PostRegisterS = {
      username,
      password,
      role,
    };

    try {
      console.log("User data:", user);
      const res = await PostRegisterF(user); // Usa await aquí
      console.log("Response data:", res);

      if (res?.token) {
        setToken(res.token); // Guarda el token
        navigate("/login"); // Redirige después del registro
      } else {
        console.error("No se recibió un token en la respuestaa.");
      }
    } catch (error) {
      console.error("Error durante el registro:", error);
    }
  }

  return (
    <>
      <div className="flex flex-col space-y-5 max-w-md mx-auto">
        <h1 className="text-xl text-center">Sign up | Register</h1>

        <input
          className="outline rounded p-2"
          placeholder="username"
          value={username} // Vinculado al estado
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          type="password"
          className="outline rounded p-2"
          placeholder="password"
          value={password} // Vinculado al estado
          onChange={(e) => setPassword(e.target.value)}
        />
        
        {/* Selector para roles */}
        <select
          className="outline rounded p-2"
          value={role} // Vinculado al estado
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="admin">Admin</option>
          <option value="client">Client</option>
        </select>

        <button
          className="text-blue-500 hover:text-blue-400"
          type="button"
          onClick={handleRegister}
        >
          Regístrate
        </button>

        <button
          className="text-blue-500 hover:text-blue-400 text-sm"
          type="button"
          onClick={() => navigate("/login")}
        >
          Already have an account? Log in
        </button>
      </div>
    </>
  );
}

export default Register;
