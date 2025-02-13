import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { jwtDecode } from "jwt-decode";
import calendario from "../../assets/calendario.png";
import Movements from "../dashboard/movements";
import flechaderecha from "../../assets/flecha-derecha.png";

import { PolarArea } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

const Reportes = () => {
  const navigate = useNavigate();
  const [datos, setDatos] = useState([]); // Estado para almacenar los datos
  const [graphData, setGraphData] = useState([]);
  const [cargando, setCargando] = useState(true); // Estado para manejar la carga
  const [error, setError] = useState(null); // Estado para manejar errores
  const [sales, setSales] = useState(null);

  const getSales = async () => {
    try {
      setCargando(true); // Iniciar carga antes de hacer la petición
      const response = await axios.get("http://localhost:3000/reportes");
      setSales(response.data);
      console.log(response.data);
    } catch (err) {
      console.error("Error al obtener las ventas:", err);
      setSales(null); // Si falla, evita que tenga un array vacío
    } finally {
      setCargando(false); // Finaliza la carga, sin importar el resultado
    }
  };

  useEffect(() => {
    getSales();
  }, []);

  if (cargando) {
    return <div>Cargando reportes...</div>;
  }

  if (!sales) {
    return <div>Error al cargar los reportes</div>;
  }
  const fecha = new Date().toLocaleDateString("es-ES", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const categorias = sales.ventas_por_categoria.map((item) => item.categoria);
  const valores = sales.ventas_por_categoria.map((item) => item.total_vendido);

  // Configuración de datos para Chart.js
  const data = {
    labels: categorias,
    datasets: [
      {
        label: "Ventas por categoría",
        data: valores,
        backgroundColor: [
          "rgba(30, 64, 175, 0.6)", // Azul-800 con 60% de opacidad
          "rgba(29, 78, 216, 0.6)", // Azul-700 con 60% de opacidad
          "rgba(37, 99, 235, 0.6)", // Azul-600 con 60% de opacidad
          "rgba(30, 58, 138, 0.6)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="flex flex-wrap ml-16 mt-10 gap-5">
      {/* Sección izquierda: Bienvenida y opciones (3/5 del ancho) */}
      <div className="w-full lg:w-5/12 min-w-[300px] rounded-xl px-6 h-4/6 flex flex-col justify-start items-start ">
        <section className="text-blue-950 text-left">
          <h1 className="text-8xl font-bold">Reportes</h1>
          <div className="mt-10 ml-1 flex items-center space-x-2">
            <img className="w-6 h-6" src={calendario} alt="Calendario" />
            <p className="text-lg font-medium">{fecha}</p>
          </div>
        </section>
        <h1 className="text-left text-4xl font-bold text-blue-950 my-5">
          Ventas Filtradas
        </h1>
        <div className=" ml-1 flex items-center space-x-2 mt-2">
          <img className="w-6 h-6" src={flechaderecha} alt="" />
          <h1 className="text-left text-2xl font-medium text-blue-950 mb-2">
            Ventas por Vendedor
          </h1>
        </div>
        <Movements datos={sales?.ventas_por_vendedor} col1="ID" col2="Nombre" />
        <div className=" ml-1 flex items-center space-x-2 mt-2">
          <img className="w-6 h-6" src={flechaderecha} alt="" />
          <h1 className="text-left text-2xl font-medium text-blue-950 mb-2">
            Clientes Por compras
          </h1>
        </div>
        <Movements datos={sales?.clientes_cantidad} col1="ID" col2="Nombre" />
        <div className=" ml-1 flex items-center space-x-2 mt-2">
          <img className="w-6 h-6" src={flechaderecha} alt="" />
          <h1 className="text-left text-2xl font-medium text-blue-950 mb-2">
            Clientes por Recaudación
          </h1>
        </div>
        <Movements
          datos={sales?.clientes_top_recaudacion}
          col1="ID"
          col2="Nombre"
        />
        <div className=" ml-1 flex items-center space-x-2 mt-2">
          <img className="w-6 h-6" src={flechaderecha} alt="" />
          <h1 className="text-left text-2xl font-medium text-blue-950 mb-2">
            Productos más vendidos
          </h1>
        </div>
        <Movements
          datos={sales?.productos_mas_vendidos}
          col1="ID"
          col2="Nombre"
        />

        <section className="flex flex-wrap justify-start w-full mt-12 gap-6"></section>
      </div>

      {/* Sección derecha: Tabla de movimientos  */}
      <div className=" w-full lg:w-5/12 min-w-[300px] mr-18 rounded-xl px-6 lg:mt-32 mr-20 h-4/6 border-2 border-sky-950 flex-1">
        <div className=" p-4 rounded-lg ">
          <div className="flex flex-col items-left  border-2  border-blue-950 rounded-lg p-4">
            <h2 className="text-2xl font-bold text-blue-950 ">IVA del Mes</h2>
            <div className="flex flex-wrap">
              <div className=" ml-1 flex items-center space-x-2 mt-2">
                <img className="w-6 h-6" src={flechaderecha} alt="" />
                <h1 className="text-left text-2xl font-medium text-blue-950    mb-2">
                  IVA CF: {sales.iva_cf}
                </h1>
              </div>
              <div className=" flex items-center space-x-2 mt-2 ml-4">
                <img className="w-6 h-6" src={flechaderecha} alt="" />
                <h1 className="text-left text-2xl font-medium text-blue-950    mb-2">
                  IVA DF: {sales.iva_df}
                </h1>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center mt-10">
            <h2 className="text-2xl font-bold text-blue-950 mb-4">
              Ventas por Categoría
            </h2>
            p
            <div className="w-96 h-96">
              <PolarArea data={data} />
            </div>
            <button
              className=" self-center p-4 rounded-lg flex flex-wrap gap-4 text-gray-100 bg-blue-950 hover:bg-sky-900 trasition duration-500"
              type="button"
              onClick={() => navigate("/Ventas/vermas")}
            >
              <p className="flex-1">Ver todas las ventas</p>
              <img className="w-6 h-6 ml-1 " src={flechaderecha} alt="" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reportes;
