import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/authContext";
import Swal from "sweetalert2";
import check from "../../assets/cheque.png";

function Login() {
  const [credentials, setCredentials] = useState({ id: "", password: "" });

  const navigate = useNavigate();

  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: credentials.id,
          password: credentials.password,
        }),
      });

      if (response.status === 401) {
        localStorage.removeItem("token");  // Eliminar token
        window.location.href = "/login";   // Redirigir al login
      }

      const data = await response.json();

      if (response.ok) {
        login({ id: credentials.id }, data.token); // Llama a la función de login del contexto
        Swal.fire({
          title: "¡Inicio de sesión exitoso!",
          showClass: {
            popup: `
              animate__animated
              animate__fadeIn
            `,
          },
          text: "Bienvenido de nuevo!",
          confirmButtonText: "Continuar",
          timer: 1000,
          allowOutsideClick: false,
          customClass: {
            popup:
              "bg-sky-50 rounded-lg shadow-xl rounded-lg border-2 border-sky-800",
            title: "text-4xl font-bold text-sky-950",
            text: "text-sky-900 font-medium",
            confirmButton:
              "bg-sky-950 focus:bg-sky-900 transition text-white font-bold py-2 px-4 rounded",
          },
        }).then(() => {
          navigate("/Home"); // Redirige después de cerrar el mensaje
        });
      } else {
        console.error("Error:", data.message);
        Swal.fire({
          title: "Datos incorrectos",
          showClass: {
            popup: `
              animate__animated
              animate__fadeIn
            `,
          },
          text: "Usuario o contraseña incorrectos",
          confirmButtonText: "Continuar",
          timer: 1000,
          allowOutsideClick: false,
          customClass: {
            popup:
              "bg-sky-50 rounded-lg shadow-xl rounded-lg border-2 border-sky-800",
            title: "text-4xl font-bold text-sky-950",
            text: "text-sky-900 font-medium",
            confirmButton:
              "bg-sky-950 focus:bg-sky-900 transition text-white font-bold py-2 px-4 rounded",
          },
        });
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

  return (
    <div className="mt-32 flex flex-wrap p-8">
      <section className="flex-1 w-3/5">
        <section className="  text-center mx-auto ">
          <h1 className="text-7xl font-bold text-sky-950">Iniciar Sesión</h1>
          <p className="text-lg mt-4 mb-8 font-medium text-sky-900">
            Ingresa tus datos para iniciar sesión
          </p>
        </section>
        <form
          className="border-2 border-sky-950 rounded-lg p-4 w-72 mx-auto  content-center grid shadow-2xl shadow-gray-500"
          onSubmit={handleSubmit}
        >
          <label className="font-medium text-sky-950 mb-1" htmlFor="id">
            N° Documento:{" "}
          </label>
          <input
            className="rounded-md text-sky-900 pl-2 border-2 border-sky-900 transition duration-200  focus:bg-sky-100 font-medium"
            type="text"
            value={credentials.id}
            onChange={(e) =>
              setCredentials({ ...credentials, id: e.target.value })
            }
            required
          />

          <label
            className="font-medium text-sky-950 mt-4 mb-1"
            htmlFor="password"
          >
            Constraseña:{" "}
          </label>
          <input
            className="rounded-md text-sky-950 pl-2 border-2 border-sky-900 transition duration-200 focus:bg-sky-100"
            type="password"
            value={credentials.password}
            onChange={(e) =>
              setCredentials({ ...credentials, password: e.target.value })
            }
            required
          />
          <button
            className=" mx-auto self-center text-center font-medium text-sky-50   rounded-lg border-2 border-sky-900 backdrop-blur  transition duration-200 focus:bg-sky-800 mt-6 w-full h-10 bg-sky-900"
            type="submit"
          >
            Iniciar sesión
          </button>
        </form>
      </section>
    </div>
  );
}

export default Login;
