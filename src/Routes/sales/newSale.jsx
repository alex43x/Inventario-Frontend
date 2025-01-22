import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import ProductSearch from "./productSearch";

export default function NewSale() {
  const [nombre, setNombre] = useState("");
  const [descrip, setDescrip] = useState("");
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const [selectedOption, setSelectedOption] = useState(""); // Estado para guardar la opción seleccionada

  useEffect(() => {
    axios
      .get(`http://localhost:3000/products`)
      .then((response) => {
        console.log("Productos recibidos", response.data);
        setProducts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/categories`)
      .then((response) => {
        console.log("Categorías recibidas", response.data);
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
      const response = await axios.post("http://localhost:3000/products", {
        nombre: nombre,
        descrip: descrip,
        stock: form.stock.value,
        iva: selectedOption,
        categoria: selectedCategory,
      });
      console.log("Producto añadido:", response.data);
      alert("Producto añadido con éxito");
      const originalData = response.data;
      navigate("/Inventario/addBatch", { state: { originalData } }); // Redirige al formulario de lote
    } catch (error) {
      console.error("Error al añadir el producto:", error);
      alert("Hubo un error al añadir el producto");
    }
  };

  return (
    <div>
      <h1 className="text-7xl font-bold text-green-800 m-12 p-5 text-center">
        Nueva Venta
      </h1>
      <h3 className="text-3xl font-bold text-green-800 m-2 p-5 text-center">
        Datos de la venta
      </h3>

      <div className="flex justify-center">
        <form
          className=" text-green-800 text-left  border-2 border-green-700 rounded-lg p-3 flex flex-col items- w-10/12"
          onSubmit={handleSubmit}
        >
          <div className="inline-block border-b-2 border-green-700">
            <label className="inline-flex mr-2">Cliente </label>
            <input
              className=" rounded-md pl-2"
              type="text"
              placeholder="Nombre del cliente"
              value="Rocko 🐶"
              onChange={(e) => setNombre(e.target.value)}
              required
            />
            <label className="inline-flex mx-2">Fecha </label>
            <input
              className=" rounded-md pl-2"
              value="hoy"
              onChange={(e) => setDescrip(e.target.value)}
              required
            />
            <label className="inline-flex m-2">Vendedor </label>
            <input
              className=" rounded-md pl-2"
              placeholder="Descripción"
              value="Vendedor"
              onChange={(e) => setDescrip(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-wrap">
            <div className="w-1/2 p-3"><ProductSearch /></div>
            <div className="w-1/2 p-3">
              <h1 className="text-xl mb-4">Productos:</h1>
            </div>
            
          </div>
          <button
            className="mt-5 text-gray-300 self-center text-center px-4 h-8 rounded backdrop-blur bg-green-800 transition hover:bg-green-900"
            type="submit"
          >
            Finalizar
          </button>
          <br />
        </form>
      </div>
      <div className="flex justify-center items-center h-full">
        <a href="/Productos">
          <button className="text-gray-300 m-4 self-center text-center px-4 h-8 rounded backdrop-blur bg-green-800 transition hover:bg-green-900">
            Regresar
          </button>
        </a>
      </div>
    </div>
  );
}
