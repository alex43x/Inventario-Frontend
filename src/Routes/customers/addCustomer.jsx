import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import flecha from "../../assets/flecha-izquierda.png";
import anadir from "../../assets/anadir.png";
import React from "react";
import Swal from "sweetalert2";

export default function AddCustomer() {
  const [id, setId] = useState(0);
  const [nombre, setNombre] = useState("");
  const [descrip, setDescrip] = useState("");
  const [saldo, setSaldo] = useState(0);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const [selectedOption, setSelectedOption] = useState(""); // Estado para guardar la opción seleccionada

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    console.log(form);

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/customers`, {
        id: id,
        nombre: nombre,
        saldo: saldo,
      });
      console.log("Cliente añadido:", response.data);
      Swal.fire({
        title: "Cliente añadido",
        showClass: {
          popup: `
                    animate__animated
                    animate__fadeIn
                  `,
        },
        text: "El cliente a sido añadido con éxito",
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
      const originalData = response.data;
      navigate(-1);
    } catch (error) {
      console.error("Error al añadir el Cliente:", error);
      Swal.fire({
              title: "Datos inválidos",
              showClass: {
                popup: `
                          animate__animated
                          animate__fadeIn
                        `,
              },
              text: "El cliente ya existe o los datos enviados son inválidos",
              confirmButtonText: "Continuar",
              timer: 3000,
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
      <h1 className="md:text-7xl text-4xl font-bold text-blue-950 text-center mt-10">
        Registrar Cliente
      </h1>

      <div className="flex flex-wrap justify-center lg:w-3/5 w-4/5 mx-auto mt-10 ">
        <form
          className=" border-2 border-sky-950 rounded-lg p-4 md:w-6/12 w-full mx-auto  content-center grid shadow-2xl shadow-gray-500"
          onSubmit={handleSubmit}
        >
          <h3 className="text-2xl font-medium text-blue-950 mb-2 text-left">
            Datos del cliente
          </h3>
          <div className="">
            <label className="font-medium text-sky-950 my-2">C.I.: </label>
            <input
              className="rounded-md text-sky-950 pl-2 border-2 mb-2 border-sky-900 transition duration-200 focus:bg-sky-100 w-full"
              type="number"
              placeholder="Cédula de Identidad"
              value={id}
              onChange={(e) => setId(e.target.value)}
              required
            />

            <label className="font-medium text-sky-950 my-2">Nombre </label>
            <input
              className="rounded-md text-sky-950 pl-2 border-2 mb-2 border-sky-900 transition duration-200 focus:bg-sky-100 w-full"
              placeholder="Nombre del cliente"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />

            <label className="font-medium text-sky-950 my-2">Saldo </label>
            <input
              className="rounded-md text-sky-950 pl-2 border-2 border-sky-900 transition duration-200 focus:bg-sky-100 w-full"
              type="number"
              value={saldo}
              min={0}
              onChange={(e) => setSaldo(e.target.value)}
              required
              readOnly
            />
          </div>
          <div className="flex justify-evenly flex-wrap items-center h-full my-3 ml-1 gap-2">
            <button
              className=" self-center p-4 rounded-lg flex flex-wrap gap-4 text-gray-100 bg-blue-950 hover:bg-sky-900 trasition duration-500"
              type="submit"
            >
              <p className="flex-1">Agregar Cliente</p>
              <img className="w-6 h-6 ml-1 " src={anadir} alt="" />
            </button>
            <button
              className=" self-center p-4 rounded-lg flex flex-wrap gap-4 text-gray-100 bg-blue-950 hover:bg-sky-900 trasition duration-500"
              type="button"
              onClick={() => navigate("/Clientes")}
            >
              <p className="flex-1">Regresar</p>
              <img className="w-6 h-6 ml-1 " src={flecha} alt="" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
