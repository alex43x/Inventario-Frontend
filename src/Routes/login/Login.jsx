import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/authContext";

function Login() {
  const [credentials, setCredentials] = useState({ id: "", password: "" });

  const navigate = useNavigate();

  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: credentials.id, password: credentials.password}),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Inicio de sesión exitoso:", data);
        console.log(data.token)
        login({ id: credentials.id }, data.token); // Llama a la función de login del contexto
        navigate("/Home"); // Redirige al dashboard
      } else {
        console.error("Error:", data.message);
        alert(data.message);
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

  return (
    <div className="mt-32">
      <section className="text-green-800 text-center m-5">
        <h1 className="text-6xl font-bold ">Log-In</h1>
        <p className="text-lg m-8">Ingresa tus datos para iniciar sesión</p>
      </section>
      <form
        className="bg-green-800 rounded-lg p-5 w-72 mx-auto  content-center text-gray-200 grid shadow-2xl shadow-gray-800"
        onSubmit={handleSubmit}
      >
        <label htmlFor="id">Documento: </label>
        <input
          className="rounded-md text-gray-900 pl-2"
          type="text"
          value={credentials.id}
          onChange={(e) => setCredentials({ ...credentials, id: e.target.value })}
          required
        />
        <br />
        <label htmlFor="password">Constraseña: </label>
        <input
          className="rounded-md text-gray-900 pl-2"
          type="password"
          value={credentials.password}
          onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
          required
        />
        <br />
        <br />
        <button
          className=" mx-auto self-center text-center text-white p-4 rounded backdrop-blur bg-green-700 transition duration-200 hover:bg-green-600"
          type="submit"
        >
          Iniciar sesión
        </button>
      </form>
    </div>
  );
}

export default Login;
