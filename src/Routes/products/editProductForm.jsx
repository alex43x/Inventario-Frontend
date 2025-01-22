import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import axios from "axios";

const EditProductForm = ({ productData, onSubmit }) => {
  const location = useLocation();
  const originalData = location.state?.originalData;
  console.log('a', originalData)
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

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



  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: originalData?.nombre || "",
    descrip: originalData?.descrip || "",
    stock: originalData?.stock || "",
    iva: originalData?.iva || "",
    categoria: originalData?.categoria || "",
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
        className=" w-3/12 max-w-2xl min-w-64 text-green-800 text-left  border-2 border-green-700 rounded-lg p-3 flex flex-col items-center"
        onSubmit={handleSubmit}
      >
        <div>
          <label className="block mt-2">
            Nombre del producto:
            <br />
            <input
            className="w-full rounded-md pl-2"
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleInputChange}
              placeholder="Nombre del producto"
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
        <button className="text-gray-300 self-center text-center px-4 h-8 rounded backdrop-blur bg-green-800 transition hover:bg-green-900 m-5" type="submit">Guardar cambios</button>
      </form>
    </div>
  );
};

export default EditProductForm;
