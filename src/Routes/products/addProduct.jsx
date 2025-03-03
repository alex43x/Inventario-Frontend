import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import flecha from "../../assets/flecha-izquierda.png";
import anadir from "../../assets/anadir.png";
import React from "react";
import Swal from "sweetalert2";

export default function AddProduct() {
  const [nombre, setNombre] = useState("");
  const [descrip, setDescrip] = useState("");
  const [precio, setPrecio] = useState(0);
  const [categories, setCategories] = useState([]);
  const [alerta, setAlerta] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("");

  const [selectedOption, setSelectedOption] = useState(""); // Estado para guardar la opción seleccionada

  const [mensaje, setMensaje] = useState("");

  const mostrarMensaje = (texto) => {
    setMensaje(texto);
    setTimeout(() => setMensaje(""), 3000); // Desaparece después de 3 segundos
  };

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/categories`)
      .then((response) => {
        console.log("Categorías recibidos", response.data);
        setCategories(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value); // Actualiza el estado con el valor seleccionado
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    console.log(form);

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/products`, {
        nombre: nombre,
        descrip: descrip,
        stock: form.stock.value,
        alerta: alerta,
        iva: selectedOption,
        categoria: selectedCategory,
        precio: precio,
      });
      console.log("Producto añadido:", response.data);
      const originalData = response.data;
      Swal.fire({
        title: "Producto añadido!",
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
      navigate("/Inventario/addBatch", { state: { originalData } }); // Redirige al formulario de lote
    } catch (error) {
      console.error("Error al añadir el producto:", error);
      mostrarMensaje("Producto añadido con éxito");

      Swal.fire({
        title: "Datos inválidos",
        showClass: {
          popup: `
                    animate__animated
                    animate__fadeIn
                  `,
        },
        text: "Hubo un error al añadir el producto",
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
      <h1 className="md:text-7xl text-4xl font-bold text-blue-950 text-center mt-10">
        Registrar producto
      </h1>
      <div className="flex flex-wrap justify-center lg:w-3/5 w-4/5 mx-auto mt-10 ">
        <form
          className="border-2 border-sky-950 rounded-lg p-4 md:w-6/12 w-full mx-auto  content-center grid shadow-2xl shadow-gray-500"
          onSubmit={handleSubmit}
        >
          <h3 className="text-2xl font-medium text-blue-950 mb-2  text-left">
            Datos del producto
          </h3>
          <label className="font-medium text-sky-950  mb-1">Nombre: </label>
          <input
            className="rounded-md text-sky-950 pl-2 border-2 border-sky-900 transition duration-200 focus:bg-sky-100 w-full"
            type="text"
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
          <label className="font-medium text-sky-950 mt-2 mb-1">
            Descripción:{" "}
          </label>
          <input
            className="rounded-md text-sky-950 pl-2 border-2 border-sky-900 transition duration-200 focus:bg-sky-100 w-full"
            placeholder="Descripción"
            value={descrip}
            onChange={(e) => setDescrip(e.target.value)}
            required
          />
          <label className="font-medium text-sky-950 mt-2 mb-1">
            Precio de venta:{" "}
          </label>
          <input
            className="rounded-md text-sky-950 pl-2 border-2 border-sky-900 transition duration-200 focus:bg-sky-100 w-full"
            type="number"
            value={precio}
            min={0}
            onChange={(e) => setPrecio(e.target.value)}
            required
          />
          <label className="font-medium text-sky-950 mt-2 mb-1">Iva: </label>
          <div className="flex gap-2">
            <input
              name="iva"
              type="radio"
              value={0}
              onChange={handleOptionChange}
              checked={selectedOption === "0"}
            />
            <label> 0% </label>
            <input
              name="iva"
              type="radio"
              value={5}
              onChange={handleOptionChange}
              checked={selectedOption === "5"}
            />
            <label> 5% </label>
            <input
              name="iva"
              type="radio"
              value={10}
              onChange={handleOptionChange}
              checked={selectedOption === "10"}
              required
            />
            <label> 10% </label>
          </div>
          <label className="font-medium text-sky-950 mt-1 mb-1">
            Categoría:{" "}
          </label>
          <select
            className="rounded-md text-sky-950 pl-2 border-2 border-sky-900 transition duration-200 focus:bg-sky-100  w-full"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            required
          >
            <option value="" disabled>
              -- Selecciona una categoría --
            </option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.nombre}
              </option>
            ))}
          </select>
          <label className="font-medium text-sky-950 mt-2 mb-1">
            Alerta de Stock:{" "}
          </label>
          <input
            className="rounded-md text-sky-950 pl-2 border-2 border-sky-900 transition duration-200 focus:bg-sky-100  w-full"
            name="alerta"
            type="number"
            placeholder="Cantidad para alertar pocas unidades"
            onChange={(e) => setAlerta(e.target.value)}
          />
          <input
            name="stock"
            type="number"
            placeholder="Stock"
            value={0}
            hidden
          />
          <br />
          <div className="flex justify-evenly flex-wrap items-center h-full mt-auto ml-1 gap-2">
            <button
              className=" self-center p-4 rounded-lg flex flex-wrap gap-4 text-gray-100 bg-blue-950 hover:bg-sky-900 trasition duration-500"
              type="submit"
            >
              <p className="flex-1">Agregar producto</p>
              <img className="w-6 h-6 ml-1 " src={anadir} alt="" />
            </button>

            <button
              className=" self-center p-4 rounded-lg flex flex-wrap gap-4 text-gray-100 bg-blue-950 hover:bg-sky-900 trasition duration-500"
              type="button"
              onClick={() => navigate("/Productos")}
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
