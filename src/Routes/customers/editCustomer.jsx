import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

import flecha from "../../assets/flecha-izquierda.png";
import registro from "../../assets/registro.png";

import Swal from "sweetalert2";

const EditCustomer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { originalData } = location.state || {};
  console.log("Datos Recibidos:", originalData);

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

  const onBack=()=>{
    navigate(-1);
  }

  // Manejar el envío del formulario
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      // Realizar la solicitud PUT para actualizar los datos del cliente
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/customers/${formData.id}`,
        { nombre: formData.nombre, saldo: formData.saldo }
      );
      console.log("Customer actualizado:", response.data);
      Swal.fire({
        title: "Cliente actualizado",
        showClass: {
          popup: `
                    animate__animated
                    animate__fadeIn
                  `,
        },
        confirmButtonText: "Continuar",
        timer: 1000,
        allowOutsideClick: false,
        customClass: {
          popup:
            "bg-sky-50 rounded-lg shadow-xl rounded-lg border-2 border-sky-800",
          title: "text-4xl font-bold text-sky-950",
          text: "text-sky-900 font-medium",
          confirmButton:
            "bg-sky-950 focus:bg-sky-900 transition text-white font-bold py-2 px-4 rounded",
        },
      });
      // Redirigir a la página anterior con datos actualizados
      navigate(-1, { state: { originalData: formData } });
    } catch (error) {
      console.error("Error al editar el customer:", error);
      Swal.fire({
              title: "Datos inválidos",
              showClass: {
                popup: `
                          animate__animated
                          animate__fadeIn
                        `,
              },
              text: "Hubo un error al editar el cliente",
              confirmButtonText: "Continuar",
              timer: 1000,
              allowOutsideClick: false,
              customClass: {
                popup:
                  "bg-sky-50 rounded-lg shadow-xl rounded-lg border-2 border-sky-800",
                title: "text-4xl font-bold text-sky-950",
                text: "text-sky-900 font-medium",
                confirmButton:
                  "bg-sky-950 focus:bg-sky-900 transition text-white font-bold py-2 px-4 rounded",
              },
            });
    }
  };

  return (
    <div>
      <h1 className="md:text-7xl text-4xl font-bold text-blue-950 text-center my-10 ">
        Editar Cliente
      </h1>
      <div className="flex justify-center">
        <form
          className="border-2 border-sky-950 rounded-lg p-4 md:w-4/12 w-11/12 mx-auto font-medium content-center grid shadow-2xl shadow-gray-500"
          onSubmit={handleEditSubmit}
        >
          <h3 className="text-2xl font-bold text-blue-950  text-left">
            Datos del Cliente
          </h3>
          <label className="block my-2 text-blue-950 font-medium">
            C.I.:
            <br />
            <input
              type="number"
              className="rounded-md text-sky-950 px-2 border-2 border-sky-900 transition duration-200 focus:bg-sky-100 w-full"
              name="id"
              value={formData.id}
              readOnly
            />
          </label>
          <label className="block my-2 text-blue-950 font-medium">
            Nombre:
            <br />
            <input
              type="text"
              className="rounded-md text-sky-950 px-2 border-2 border-sky-900 transition duration-200 focus:bg-sky-100 w-full"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Nombre del cliente"
              required
            />
          </label>
          <label className="block my-2 text-blue-950 font-medium">
            Saldo:
            <br />
            <input
              type="number"
              className="rounded-md text-sky-950 px-2 border-2 border-sky-900 transition duration-200 focus:bg-sky-100 w-full"
              name="saldo"
              value={formData.saldo}
              readOnly
            />
          </label>
          <div className="flex justify-evenly flex-wrap items-center h-full my-4">
            <button
              className=" self-center p-4 rounded-lg flex flex-wrap gap-4 text-gray-100 bg-blue-950 hover:bg-sky-900 trasition duration-500"
              type="submit"
            >
              <p className="flex-1">Guardar cambios</p>
              <img className="w-6 h-6 " src={registro} alt="" />
            </button>
            <button
              className=" self-center p-4 rounded-lg flex flex-wrap gap-4 text-gray-100 bg-blue-950 hover:bg-sky-900 trasition duration-500"
              onClick={onBack}
              type="button"
            >
              <p className="flex-1">Regresar</p>
              <img className="w-6 h-6  " src={flecha} alt="" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCustomer;
