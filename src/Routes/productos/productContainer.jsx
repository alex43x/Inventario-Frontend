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
    <div >
      <h2>{name}</h2>
      <p>{description}</p>
      <p>Disponible: {stock}</p>
      <button onClick={handleClick}>Ver más</button>
    </div>
  );
};

export default Product;
