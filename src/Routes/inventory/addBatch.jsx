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

    try {
      const response = await axios.post(
        "http://localhost:3000/inventory",
        data
      ).then((response) => {
        alert("Lote añadido con éxito");
        navigate("/Productos");
        console.log("Lote añadido:", response.data);
      });
    } catch (error) {
      console.error("Error al añadir el lote:", error);
      alert("Hubo un error al añadir el lote");
    }

    try {
      const update = await axios.post(
        `http://localhost:3000/products/${data.prod}`,
        data
      );
      console.log("Stock del Producto actualizado");
    } catch (error) {
      console.error("Error al actualizar el stock");
    }
  };

  return (
    <div>
      <h1 className="text-7xl font-bold text-green-800 m-10 p-5 text-center">
        Nuevo Lote
      </h1>
      <h2 className="text-2xl font-bold text-green-800 m-2 p-5 text-center">
        Producto:{" "}
        <span className="text-2xl font-normal">{originalData.nombre}</span>
      </h2>
      <div className="flex justify-center">
        <form
          className=" w-3/12 max-w-2xl min-w-64 text-green-800 text-left  border-2 border-green-700 rounded-lg p-3 flex flex-col items-center"
          onSubmit={handleSubmit}
        >
          <div className='w-full'>
            <label className="block mt-2">Código del producto:</label>
            <input
              className="w-full rounded-md pl-2"
              type="text"
              name="prod"
              value={originalData.id_prod}
              readOnly
            />
            <br />
            <label>Cantidad comprada:</label>
            <br />
            <input
              className="w-full rounded-md pl-2 "
              type="number"
              name="cant"
              placeholder="Cantidad"
              required
            />
            <br />
            <label>Precio de compra (Unitario):</label>
            <br />
            <input
              className="w-full rounded-md pl-2"
              type="number"
              name="precio"
              placeholder="Prec. Unitario"
              required
            />

            <br />
            <label>Fecha de compra:</label>
            <br />
            <input
              className="w-full rounded-md pl-2"
              type="date"
              name="fecha"
              placeholder="Fecha"
              required
            />
          </div>
          <br />
          <button
            className="text-gray-300 self-center text-center px-4 h-8 rounded backdrop-blur bg-green-800 transition hover:bg-green-900"
            type="submit"
          >
            Añadir Lote
          </button>
        </form>
      </div>
      <br />
      <div className="flex justify-center items-center h-full">
        <button className="text-gray-300 m-4 self-center text-center px-4 h-8 rounded backdrop-blur bg-green-800 transition hover:bg-green-900" onClick={handleBack}>Regresar</button>
      </div>
    </div>
  );
};

export default AddBatch;
