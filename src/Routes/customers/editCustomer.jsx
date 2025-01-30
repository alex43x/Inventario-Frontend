import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const EditCustomer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { originalData } = location.state || {}; // Datos recibidos desde la navegación anterior

  // Estado inicial basado en los datos originales
  const [formData, setFormData] = useState({
    nombre: originalData?.nombre || "",
    saldo: originalData?.saldo || 0,
    id: originalData?.id || "",
  });

  // Manejo de cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Manejar el envío del formulario
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      // Realizar la solicitud PUT para actualizar los datos del cliente
      const response = await axios.put(
        `http://localhost:3000/customers/${formData.id}`,
        {nombre: formData.nombre, saldo: formData.saldo} 
      );
      console.log("Customer actualizado:", response.data);
      alert("Cliente editado con éxito");
      // Redirigir a la página anterior con datos actualizados
      navigate(-1, { state: { originalData: formData } });
    } catch (error) {
      console.error("Error al editar el customer:", error);
      alert("Hubo un error al actualizar el customer");
    }
  };

  // Si no hay datos originales, muestra un mensaje
  if (!originalData) {
    return <p>No se encontraron datos del customer.</p>;
  }

  return (
    <div>
      <h1 className="text-7xl font-bold text-green-800 m-10 p-5 text-center">
        Editar Cliente
      </h1>
      <h3 className="text-2xl font-bold text-green-800 m-2 p-5 text-center">
        Datos del Customer
      </h3>
      <div className="flex justify-center">
        <form
          className="w-3/12 max-w-2xl min-w-64 text-green-800 text-left border-2 border-green-700 rounded-lg p-3 flex flex-col items-center"
          onSubmit={handleEditSubmit}
        >
          <label className="block mt-2">
            C.I.:
            <br />
            <input
              type="number"
              className="w-full rounded-md pl-2"
              name="id"
              value={formData.id}
              readOnly
            />
          </label>
          <label className="block mt-2">
            Nombre:
            <br />
            <input
              type="text"
              className="w-full rounded-md pl-2"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Nombre del cliente"
              required
            />
          </label>
          <label className="block mt-2">
            Saldo:
            <br />
            <input
              type="number"
              className="w-full rounded-md pl-2"
              name="saldo"
              value={formData.saldo}
              readOnly
            />
          </label>
          <button
            className="text-gray-300 self-center text-center px-4 h-8 rounded backdrop-blur bg-green-800 transition hover:bg-green-900 m-5"
            type="submit"
          >
            Guardar cambios
          </button>
        </form>
      </div>
      <div className="flex justify-center items-center h-full">
        <button
          className="text-gray-300 m-4 self-center text-center px-4 h-8 rounded backdrop-blur bg-red-600 transition hover:bg-red-800"
          onClick={() => navigate(-1)}
        >
          Regresar
        </button>
      </div>
    </div>
  );
};

export default EditCustomer;
