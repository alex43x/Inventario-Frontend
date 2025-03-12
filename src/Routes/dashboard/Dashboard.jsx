import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Section from "./sections";

import { jwtDecode } from "jwt-decode";
import calendario from "../../assets/calendario.png";
import SalesData from "./salesData";
import LineChart from "./lineChart";

const Dashboard = () => {
  const navigate = useNavigate();
  const [datos, setDatos] = useState([]); // Estado para almacenar los datos
  const [graphData, setGraphData] = useState([]);
  const [cargando, setCargando] = useState(false); // Estado para manejar la carga
  const [error, setError] = useState(null); // Estado para manejar errores
  const [sales, setSales] = useState([]);

  const getSales = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/sales-dashboard`
      );
      setSales(response.data);
    } catch (err) {
      console.error("Error al obtener las ventas:", err);
      setSales([]); // Asegura que el estado no sea indefinido en caso de error
    }
  };

  const getGraph = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/sales-graph`
      );
      setGraphData(response.data);
    } catch (err) {
      console.error("Error al obtener las ventas:", err);
      setGraphData([]); // Asegura que el estado no sea indefinido en caso de error
    }
  };

  const token = localStorage.getItem("authToken");

  const userId = useMemo(() => {
    if (token) {
      const decodedToken = jwtDecode(token);
      return decodedToken.id;
    }
    return null;
  }, [token]);

  const userName = useMemo(() => {
    if (token) {
      const decodedToken = jwtDecode(token);
      return decodedToken.username;
    }
    return null;
  }, [token]);

  useEffect(() => {
    getSales();
    getGraph();
  }, []);
  if (cargando) {
    return <div>Cargando...</div>;
  }

  // Muestra un mensaje de error si algo sale mal
  if (error) {
    return <div>Error: {error}</div>;
  }

  const fecha = new Date().toLocaleDateString("es-ES", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="flex flex-wrap lg:ml-16 mx-8 mt-10 gap-5">
      {/* Sección izquierda: Bienvenida y opciones (3/5 del ancho) */}
      <div className="w-full lg:w-5/12 rounded-xl lg:px-6 h-2/3 flex flex-col justify-start items-start">
        <section className="text-blue-950 text-left w-full">
          <div className="lg:text-8xl text-5xl font-bold break-words whitespace-normal ">
            Hola, {userName}!
          </div>

          <div className="mt-10 ml-1 flex items-center space-x-2 w-9/12">
            <img className="w-6 h-6" src={calendario} alt="Calendario" />
            <p className="text-lg font-medium">{fecha}</p>
          </div>
        </section>
        <section className="flex flex-wrap justify-start w-full lg:mt-12 mt-8 gap-3">
          <Section title="Productos" text="Ver los productos disponibles" />
          <Section title="Ventas" text="Registrar ventas realizadas" />
          <Section title="Clientes" text="Ver deudas de clientes" />
          <Section title="Reportes" text="Ver reportes de ventas y compras" />
        </section>
      </div>

      {/* Sección derecha: Tabla de movimientos  */}
      <div className=" w-full lg:w-5/12  mr-18 rounded-xl px-6 lg:mr-20 mx-auto h-4/6 border-2 border-sky-950 flex-1">
        <h1 className="text-left text-4xl font-bold text-blue-950 my-5">
          Tus ventas
        </h1>
        <div className="flex gap-6 flex-wrap  border-b-2 border-sky-950 pb-5 ">
          <SalesData
            className="flex-1 "
            title="Día"
            text={sales?.[0]?.total || 0}
          />
          <SalesData title="Semana" text={sales?.[1]?.total || 0} />
          <SalesData title="Mes" text={sales?.[2]?.total || 0} />
        </div>
        <div className=" p-4 rounded-lg ">
          <h2 className="text-xl font-bold text-sky-950 mb-4">
            Ventas Últimos 7 Días
          </h2>
          {sales.length > 0 ? (
            <LineChart salesData={graphData} />
          ) : (
            <p>Cargando datos...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
