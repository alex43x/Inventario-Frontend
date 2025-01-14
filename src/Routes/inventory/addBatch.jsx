import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

import axios from "axios";

const AddBatch = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { originalData } = location.state || {};
  console.log("Datos Recibidos:", originalData);

  const handleBack = () => {
    navigate(-1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const data = {
      prod: originalData.id_prod,
      cant: form.cant.value,
      precio: form.precio.value,
      fecha: form.fecha.value,
    };
    console.log(data.fecha)
    try {
      const response = await axios.post("http://localhost:3000/inventory", data);
      console.log("Lote añadido:", response.data);
      alert("Lote añadido con éxito");
      
    } catch (error) {
      console.error("Error al añadir el lote:", error);
      alert("Hubo un error al añadir el lote");
    };

    try{
        const update =await axios.post(`http://localhost:3000/products/${data.prod}`, data );
        alert('Stock del Producto actualizado')
    } catch(error) {
        console.error('Error al actualizar el stock')
        alert("No se pudo cambiar el stock")
    }
    navigate(-1);
}

  return (
    <div>
      <h1>Nuevo Lote</h1>
      <h2>Producto: {originalData.nombre}</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Código del producto:
          <input type="text" name="prod" value={originalData.id_prod} readOnly />
        </label>
        <br />
        <label>
          Cantidad comprada:
          <input type="number" name="cant" placeholder="Cantidad" />
        </label>
        <br />
        <label>
          Precio de compra (Unitario):
          <input type="number" name="precio" placeholder="Prec. Unitario" />
        </label>
        <br />
        <label>
          Fecha de compra:
          <input type="date" name="fecha" placeholder="Fecha" />
        </label>
        <br />
        <br />
        <button type="submit">Añadir Lote</button>
      </form>
      <br />
      <button onClick={handleBack}>Regresar</button>
    </div>
  );
};

export default AddBatch;
