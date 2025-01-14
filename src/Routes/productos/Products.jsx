import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, Outlet } from "react-router-dom";

import "../styles/app.css";
import Product from "./productContainer";

const Productos = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/products")
      .then((response) => {
        console.log("Productos recibidos", response.data);
        setProductos(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const handleDelete = async (id) => {
    await fetch(`http://localhost:3000/products/${id}`, { method: "DELETE" });
    setProductos(productos.filter((producto) => producto.id_prod !== id)); // Actualiza la lista de productos
  };

  return (
    <div>
      <h1>Productos</h1>
      <p>Ver los productos disponibles</p>
      <Link to="addProduct">
        <button>Añadir Producto</button>
      </Link>
      <Outlet />
      <span> </span>
      <Link to="/">
        <button>Regresar</button>
      </Link>
      <ul>
        {productos.map((producto) => (
          <Product
            key={producto.id_prod}
            name={producto.nombre}
            description={producto.descrip}
            stock={producto.stock}
            deleteProduct={handleDelete}
            producto={producto}
          />
        ))}
      </ul>
    </div>
  );
};

export default Productos;
