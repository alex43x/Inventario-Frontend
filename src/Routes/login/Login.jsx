import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/authContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
        login({ id: credentials.id }, data.token); // Llama a la función de login del contexto
        toast.success("Lote anulado con éxito 🎉", {
          position: "top-right",
          autoClose: 3000, // Se cierra en 3 segundos
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
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
        <h1 className="text-7xl font-bold ">Log-In</h1>
        <p className="text-lg m-8">Ingresa tus datos para iniciar sesión</p>
      </section>
      <form
        className="border-2 border-green-700 rounded-lg p-5 w-72 mx-auto  content-center text-green-800 grid shadow-2xl shadow-gray-500"
        onSubmit={handleSubmit}
      >
        <label htmlFor="id">Documento: </label>
        <input
          className="rounded-md text-green-900 pl-2 border-2 border-green-800"
          type="text"
          value={credentials.id}
          onChange={(e) => setCredentials({ ...credentials, id: e.target.value })}
          required
        />
        <br />
        <label htmlFor="password">Constraseña: </label>
        <input
          className="rounded-md text-green-900 pl-2 border-2 border-green-800"
          type="password"
          value={credentials.password}
          onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
          required
        />
        <br />
        <br />
        <button
          className=" mx-auto self-center text-center font-medium text-green-900 p-4 rounded-lg border-2 border-green-700 backdrop-blur  transition duration-200 hover:bg-green-100"
          type="submit"
        >
          Iniciar sesión
        </button>
      </form>
    </div>
  );
}

export default Login;
