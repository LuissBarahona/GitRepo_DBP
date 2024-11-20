import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useToken from "../hooks/useToken";
import { PostLoginS } from "../src/Interfaces"; // Import a la estructura | DTO | interface
import { PostLoginF } from "../src/Api"; // Import a la función que hace POST  /auth/register

function Login() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const { setToken } = useToken();
  const navigate = useNavigate();

  async function handleLogin() {
    const user: PostLoginS = {
      username,
      password,
    };

    try {
      const res = await PostLoginF(user);
      const { token, role } = res.data;
      setToken({ token, role }); // Guarda token y rol
      navigate("/inicio");
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  }

  return (
    <div className="flex flex-col space-y-5 max-w-md mx-auto">
      <h1 className="text-xl text-center">Log in</h1>

      <input
        className="outline rounded p-2"
        placeholder="username"
        onChange={(e) => setUserName(e.target.value)}
      />
      <input
        type="password"
        className="outline rounded p-2"
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        className="text-blue-500 hover:text-blue-400"
        type="button"
        onClick={handleLogin}
      >
        Log in
      </button>
    </div>
  );
}

export default Login;
