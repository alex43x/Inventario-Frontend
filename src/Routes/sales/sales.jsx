import React from "react";
import { useNavigate } from "react-router-dom";
import Section from "../dashboard/sections";
import { Link } from "react-router-dom";

const Ventas = () => {
  return (
    <div>
      <section className="text-green-800 text-center mt-20">
        <h1 className="text-6xl font-bold ">Ventas</h1>{" "}
        {/* Muestra datos del usuario */}
        <p className="text-lg m-8">...</p>
      </section>
      <section className="flex justify-center flex-wrap ">
        <Link to="NuevaVenta">
          <div className="bg-green-800 rounded-lg p-5 w-72 text-gray-200 m-2 shadow-2xl shadow-gray-700 transition duration-200 hover:bg-green-900">
            <h1 className=" text-4xl font-bold">Nueva Venta</h1>
            <p className=" mt-5">Registrar nueva venta</p>
          </div>
        </Link>
        <Link to="VerMas">
          <div className="bg-green-800 rounded-lg p-5 w-72 text-gray-200 m-2 shadow-2xl shadow-gray-700 transition duration-200 hover:bg-green-900">
            <h1 className="text-4xl font-bold">Ver Más</h1>
            <p className=" mt-5">Ver ventas anteriores</p>
          </div>
        </Link>
      </section>
    </div>
  );
};

export default Ventas;
