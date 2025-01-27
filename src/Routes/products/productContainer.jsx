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
    <div className="bg-green-800 shadow-2xl shadow-gray-700 rounded-md p-4 w-72 text-gray-200 m-4 text-left transition duration-150 hover:bg-green-900">
      <h2 className=" text-2xl font-bold">{name}</h2>
      <p className="mt-5 font-semibold">{description}</p>
      <p className="font-semibold">Disponible: {stock}</p>
      <button className="w-11/12 m-2 text-green-950 p-2 rounded-sm backdrop-blur bg-gray-300 hover:bg-gray-400"onClick={handleClick}>Ver más</button>
    </div>
  );
};

export default Product;
