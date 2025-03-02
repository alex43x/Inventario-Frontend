import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import axios from "axios";
import flecha from "../../assets/flecha-izquierda.png";
import registro from "../../assets/registro.png";
import Swal from "sweetalert2";

const AddBatch = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [date, setDate] = useState(() => {
    const fecha = new Date();
    const offset = fecha.getTimezoneOffset(); // Diferencia de zona horaria en minutos
    fecha.setMinutes(fecha.getMinutes() - offset); // Ajustar a la hora local
    return fecha.toISOString().slice(0, 16);
  });
  const [cantidad, setCantidad] = useState("");
  const [precioCompra, setPrecioCompra] = useState("");

  const handleCantidadChange = (e) => setCantidad(e.target.value);
  const handlePrecioChange = (e) => setPrecioCompra(e.target.value);
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
      const response = await axios
        .post(`${import.meta.env.VITE_API_URL}/inventory`, data)
        .then((response) => {
          Swal.fire({
            title: "Lote registrado",
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
        });
    } catch (error) {
      console.error("Error al añadir el lote:", error);
      Swal.fire({
        title: "Datos incorrectos",
        showClass: {
          popup: `
                    animate__animated
                    animate__fadeIn
                  `,
        },
        text: "Hubo un error al registrar el lote",
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

    try {
      const update = await axios.post(
        `${import.meta.env.VITE_API_URL}/products/${data.prod}`,
        data
      );
      console.log("Stock del Producto actualizado");
    } catch (error) {
      console.error("Error al actualizar el stock");
    }
  };

  return (
    <div>
      <h1 className="text-7xl font-bold text-blue-950 m-10 p-5 text-center">
        Nuevo Lote
      </h1>
      <div className="flex flex-wrap justify-center w-3/5 mx-auto mt-10 ">
        <form
          className="border-2 border-sky-950 rounded-lg p-4 md:w-6/12 w-full mx-auto  content-center grid shadow-2xl shadow-gray-500"
          onSubmit={handleSubmit}
        >
          <h2 className="text-2xl text-left font-bold text-blue-950 mb-2">
            Producto:{" "}
            <span className="text-2xl font-normal">{originalData.nombre}</span>
          </h2>

          <label className="block mt-2">Código del producto:</label>
          <input
            className="w-full rounded-md pl-2"
            type="text"
            name="prod"
            value={originalData.id_prod}
            readOnly
          />

          <label className="mt-3">Cantidad comprada:</label>

          <input
            className="w-full rounded-md pl-2 "
            type="number"
            name="cant"
            min={1}
            placeholder="Cantidad"
            required
            onChange={handleCantidadChange}
          />

          <label className="mt-2">Precio de compra (Unitario):</label>

          <input
            className="w-full rounded-md pl-2"
            type="number"
            name="precio"
            min={0}
            placeholder="Prec. Unitario"
            required
            onChange={handlePrecioChange}
          />

          <label className="mt-2">Fecha y Hora de compra:</label>

          <input
            value={date}
            className="w-full rounded-md pl-2"
            type="datetime-local"
            name="fecha"
            placeholder="Fecha"
            required
          />

          <div className="flex justify-evenly flex-wrap items-center h-full ml-1 my-6 gap-4">
            <button
              className=" self-center p-4 rounded-lg flex flex-wrap gap-4 text-gray-100 bg-blue-950 hover:bg-sky-900 trasition duration-500"
              type="submit"
            >
              <p className="flex-1">Añadir Lote</p>
              <img className="w-6 h-6 ml-1 " src={registro} alt="" />
            </button>

            <button
              className=" self-center p-4 rounded-lg flex flex-wrap gap-4 text-gray-100 bg-blue-950 hover:bg-sky-900 trasition duration-500"
              onClick={handleBack}
              type="button"
            >
              <p className="flex-1">Regresar</p>
              <img className="w-6 h-6 ml-1 " src={flecha} alt="" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBatch;
