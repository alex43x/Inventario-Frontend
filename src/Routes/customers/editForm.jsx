import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import axios from "axios";

const EditCustomerForm = () => {
  const location = useLocation();
  const originalData = location.state?.originalData;
  console.log("a", originalData);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: originalData?.nombre || "",
    descrip: originalData?.descrip || "",
    stock: originalData?.stock || "",
    iva: originalData?.iva || "",
    categoria: originalData?.categoria || "",
    precio: originalData?.precio || "",
  });

  // Rellena el formulario con los datos iniciales del customer
  useEffect(() => {
    if (customerData) {
      setFormData({
        nombre: originalData.nombre || "",
        descrip: originalData.descrip || "",
        stock: originalData.stock || 0,
        iva: originalData.iva,
        categoria: originalData.categoria || "",
        precio: originalData.precio,
      });
    }
  }, [customerData]);

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
          Datos del Cliente:{" "}
        </h3>
        <div>
          <label className="block mt-2">
            Nombre:
            <br />
            <input
              className="w-full rounded-md pl-2"
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleInputChange}
              placeholder="Nombre del customer"
            />
          </label>
          <label>
            Descripción:
            <br />
            <input
              className="w-full rounded-md pl-2"
              type="text"
              name="descrip"
              value={formData.descrip}
              onChange={handleInputChange}
              placeholder="Descripción"
            />
          </label>
          <label>
            Precio
            <br />
            <input
              className="w-full rounded-md pl-2"
              type="number"
              name="precio"
              min={0}
              value={formData.precio}
              onChange={handleInputChange}
              placeholder="Descripción"
            />
          </label>
          <br />
          <label>
            Stock:
            <br />
            <input
              className="w-full rounded-md pl-2"
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleInputChange}
              placeholder="Stock"
              readOnly
            />
          </label>
          <br />
          <label>
            IVA:
            <br />
            <input
              className="w-full rounded-md pl-2"
              type="number"
              name="IVA"
              value={formData.iva}
              onChange={handleInputChange}
              placeholder="IVA"
              readOnly
            />
          </label>
          <br />
          <label>Categoría</label>
          <select
            className="w-full rounded-md pl-2"
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
          <br />
        </div>
        <button
          className="text-gray-300 self-center text-center px-4 h-8 rounded backdrop-blur bg-green-800 transition hover:bg-green-900 m-5"
          type="submit"
        >
          Guardar cambios
        </button>
      </form>
    </div>
  );
};

export default EditCustomerForm;
