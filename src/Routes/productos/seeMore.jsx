import React from "react";
import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";

import axios from "axios";

const SeeMore = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { originalData } = location.state || {};

  console.log("Datos recibidos: ", originalData);

  const handleEdit = (event) => {
    event.preventDefault();
    navigate("/Productos/editProduct", { state: { originalData } });
  };

  const handleDelete = async () => {
    alert('El producto no podrá ser recuperado');
    axios.delete(`http://localhost:3000/products/${originalData.id_prod}`);
    navigate(-1);
  };

  return (
    <div>
      <h1>{originalData.nombre}</h1>
      <p>Código: {originalData.id_prod}</p>
      <p>Descripción: {originalData.descrip}</p>
      <p>Stock: {originalData.stock} disponible(s)</p>
      <button onClick={handleEdit}>Editar</button>
      <span> </span>
      <button onClick={handleDelete}>Eliminar</button>
      <span> </span>
      <button onClick={() => navigate(-1)}>Regresar</button>
    </div>
  );
};

export default SeeMore;
