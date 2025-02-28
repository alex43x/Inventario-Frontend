import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import axios from "axios";
import flecha from "../../assets/flecha-izquierda.png";
import registro from "../../assets/registro.png";

const EditProductForm = ({ productData, onSubmit, onBack }) => {
  const location = useLocation();
  const originalData = location.state?.originalData;
  console.log("a", originalData);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(originalData.categoria);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/categories`)
      .then((response) => {
        console.log("Categorías recibidas", response.data);
        setCategories(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: originalData?.nombre || "",
    descrip: originalData?.descrip || "",
    stock: originalData?.stock || "",
    iva: originalData?.iva || "",
    categoria: originalData?.categoria || "",
    precio: originalData?.precio || "",
    alerta: originalData?.alerta || "",
  });

  // Rellena el formulario con los datos iniciales del producto
  useEffect(() => {
    if (productData) {
      setFormData({
        nombre: originalData.nombre || "",
        descrip: originalData.descrip || "",
        stock: originalData.stock || 0,
        iva: originalData.iva,
        categoria: originalData.categoria || "",
        precio: originalData.precio,
        alerta: originalData.alerta,
      });
    }
  }, [productData]);

  // Manejar cambios en los inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData); // Llama a la función para enviar los datos
  };

  return (
    <div className="flex justify-center">
      <form
        className="border-2 border-sky-950 rounded-lg p-4 md:w-4/12 w-11/12 mx-auto font-medium content-center grid shadow-2xl shadow-gray-500"
        onSubmit={handleSubmit}
      >
        <h3 className="text-2xl font-bold text-blue-950  text-left">
          Datos del Producto:{" "}
        </h3>

        <label className="block mt-2 ">
          Nombre del producto:
          <input
            className="rounded-md text-sky-950 px-2 border-2 border-sky-900 transition duration-200 focus:bg-sky-100 w-full"
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleInputChange}
            placeholder="Nombre del producto"
          />
        </label>
        <label className=" mt-2">
          Descripción:
          <input
            className="rounded-md text-sky-950 px-2 border-2 border-sky-900 transition duration-200 focus:bg-sky-100 w-full"
            type="text"
            name="descrip"
            value={formData.descrip}
            onChange={handleInputChange}
            placeholder="Descripción"
          />
        </label>
        <label className=" mt-2">
          Precio
          <input
            className="rounded-md text-sky-950 px-2 border-2 border-sky-900 transition duration-200 focus:bg-sky-100 w-full"
            type="number"
            name="precio"
            min={0}
            value={formData.precio}
            onChange={handleInputChange}
            placeholder="Precio"
          />
        </label>
        <label className="mt-2">
          Stock:
          <input
            className="rounded-md text-sky-950 px-2 border-2 border-sky-900 transition duration-200 focus:bg-sky-100 w-full"
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleInputChange}
            placeholder="Stock"
            readOnly
          />
        </label>
        <label className="mt-2">
          Alerta de Stock
          <input
            className="rounded-md text-sky-950 px-2 border-2 border-sky-900 transition duration-200 focus:bg-sky-100 w-full"
            type="number"
            name="alerta"
            value={formData.alerta}
            onChange={handleInputChange}
            placeholder="Alerta Stock"
            required
          />
        </label>
        <label className="mt-2">
          IVA:
          <input
            className="rounded-md text-sky-950 px-2 border-2 border-sky-900 transition duration-200 focus:bg-sky-100 w-full"
            type="number"
            name="IVA"
            value={formData.iva}
            onChange={handleInputChange}
            placeholder="IVA"
            readOnly
          />
        </label>

        <label className="mt-2">Categoría</label>
        <select
          className="rounded-md text-sky-950 px-2 border-2 border-sky-900 transition duration-200 focus:bg-sky-100 w-full"
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
  );
};

export default EditProductForm;
