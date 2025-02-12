import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

const Customer = ({ name = "Error", saldo = 0, cliente }) => {
  const navigate = useNavigate();

  const handleClick = (event) => {
    event.preventDefault();
    const originalData = cliente;
    console.log("Datos enviados:", originalData);
    navigate("/clientes/seeMore", { state: { originalData } });
  };

  return (
    <div className="bg-blue-950 shadow-2xl shadow-gray-500 rounded-lg p-4 md:w-64 sm:w-11/12 w-full text-gray-200 mb-4 mr-4 text-left transition duration-500 hover:bg-blue-900 flex flex-col ">
      <h2 className="text-2xl font-bold h-12">{name}</h2>
      <p className="font-medium mb-4">
        Saldo: ₲ {saldo.toLocaleString("es-ES")}
      </p>

      {/* Botón alineado al final */}
      <button
        className="w-full mt-auto text-sky-950 p-2 rounded-lg backdrop-blur bg-gray-300 trasition duration-500 hover:bg-gray-400"
        onClick={handleClick}
      >
        Ver Más
      </button>
    </div>
  );
};

export default Customer;
