import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Section from "./sections";
import Movements from "./movements";

const Dashboard = () => {
  const navigate = useNavigate();
  const [datos, setDatos] = useState([]); // Estado para almacenar los datos
  const [cargando, setCargando] = useState(true); // Estado para manejar la carga
  const [error, setError] = useState(null); // Estado para manejar errores
  const getMovements = async () => {
    try {
      const response = await axios.get("http://localhost:3000/movements"); // Cambia la URL por la de tu backend
      setDatos(response.data); // Guarda los datos en el estado
      setCargando(false); // Indica que la carga ha terminado
    } catch (err) {
      setError(err.message); // Guarda el mensaje de error
      setCargando(false); // Indica que la carga ha terminado
    }
  };
  useEffect(() => {
    getMovements();
  }, []);
  if (cargando) {
    return <div>Cargando...</div>;
  }

  // Muestra un mensaje de error si algo sale mal
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <section className="text-green-800 text-center mt-20">
        <h1 className="text-6xl font-bold ">Dashboard</h1>{" "}
        {/* Muestra datos del usuario */}
        <p className="text-lg m-8">...</p>
      </section>
      <section className="flex justify-center flex-wrap ">
        <Section title="Productos" text="Ver los productos disponibles" />
        <Section title="Ventas" text="Registrar ventas realizadas" />
        <Section title="Clientes" text="Ver deudas de clientes" />
      </section>
      <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
        <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
          Últimos movimientos:
        </h1>
        <Movements datos={datos} />
      </div>
    </div>
  );
};

export default Dashboard;
