import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

const Product = ({
  name = "Error",
  description = "Error",
  stock = 0,
  producto,
}) => {
  const navigate = useNavigate();

  const handleClick = (event) => {
    event.preventDefault();
    const originalData = producto;
    console.log("Datos enviados:", originalData);
    navigate("/Productos/seeMore", { state: { originalData } });
  };

  return (
    <div className="bg-blue-950 shadow-2xl shadow-gray-500 rounded-lg p-4 min-w-44 sm:w-11/12 w-11/12 text-gray-200 mb-4 mr-2 text-left transition duration-500 hover:bg-blue-900 flex flex-col ">
      <h2 className="text-2xl font-bold break-words">{name}</h2>
      <div className="mt-auto">
        <p className="mt-5 ">{description}</p>
        <p className="font-medium mb-4">
          Disponible: <span className="font-base">{stock}</span>
        </p>
        <button
          className="w-full mt-auto text-sky-950 p-2 rounded-lg backdrop-blur bg-gray-300 trasition duration-500 hover:bg-gray-400"
          onClick={handleClick}
        >
          Opciones...
        </button>
      </div>

      {/* Botón alineado al final */}
    </div>
  );
};

export default Product;
