import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import ViewBatches from "../inventory/viewBatches";

import axios from "axios";

const SeeMore = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { originalData } = location.state || {};
  const [batches, setBatches] = useState([]);
  const [producto, setProducto] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/products/${originalData.id_prod}`)
      .then((response) => {
        console.log("Productos recibidos", response.data);
        setProducto(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  console.log("Producto: ", producto);
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

  const handleEdit = (event) => {
    event.preventDefault();
    navigate("/Productos/editProduct", {
      state: { originalData: producto[0] },
    });
  };

  const handleDelete = async () => {
    alert("El producto no podrá ser recuperado. Solo puedes eliminar un producto si no tiene lotes activos.");
    const confirmDelete = window.confirm(
      "Estas seguro de que deseas eliminar el producto?"
    );
    if (confirmDelete) {
      axios
        .delete(`http://localhost:3000/products/${originalData.id_prod}`)
        .then(() => {
          navigate("/Productos");
        })
        .catch((error) => {
          console.error(error);
          alert('Error: El producto tiene lotes activos')
        });
    } else {
      alert("Eliminación cancelada");
    }
  };

  const newBatch = () => {
    navigate("/Inventario/addBatch", { state: { originalData: producto[0] } });
  };
  return (
    <div>
      {producto.map((producto) => (
        <section>
          <h1>{producto.nombre}</h1>
          <p>Código: {producto.id_prod}</p>
          <p>Descripción: {producto.descrip}</p>
          <p>Stock: {producto.stock} disponible(s)</p>
        </section>
      ))}
      <aside>
        <h2>Lotes disponibles:</h2>
        <ViewBatches batches={batches} />
        <br />
      </aside>
      <section>
        <button onClick={handleEdit}>Editar</button>
        <span> </span>
        <button onClick={newBatch}>Añadir Lote</button>
        <span> </span>
        <button onClick={handleDelete}>Eliminar</button>
        <span> </span>
        <button onClick={() => navigate(-1)}>Regresar</button>
      </section>
    </div>
  );
};

export default SeeMore;
