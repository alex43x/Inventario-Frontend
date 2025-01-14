import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";

import ViewBatches from "../inventory/viewBatches";

import axios from "axios";

const SeeMore = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { originalData } = location.state || {};
  const [batches, setBatches] = useState([]);

  console.log("Producto: ", originalData);

  const handleEdit = (event) => {
    event.preventDefault();
    navigate("/Productos/editProduct", { state: { originalData } });
  };

  const handleDelete = async () => {
    alert("El producto no podrá ser recuperado");
    axios.delete(`http://localhost:3000/products/${originalData.id_prod}`);
    navigate(-1);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3000/inventory/${originalData.id_prod}`)
      .then((response) => {
        console.log("Lotes recibidos: ", response.data);
        setBatches(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <section>
        <h1>{originalData.nombre}</h1>
        <p>Código: {originalData.id_prod}</p>
        <p>Descripción: {originalData.descrip}</p>
        <p>Stock: {originalData.stock} disponible(s)</p>
      </section>
      <aside>
        <h2>Lotes disponibles:</h2>
        <ViewBatches batches={batches} />
        <br />
      </aside>
      <section>
      <button onClick={handleEdit}>Editar</button>
      <span> </span>
        <button onClick={handleDelete}>Eliminar</button>
        <span> </span>
        <button onClick={() => navigate(-1)}>Regresar</button>
      </section>
    </div>
  );
};

export default SeeMore;
