import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/app.css";
import axios from "axios";

const EditProductForm = ({ productData, onSubmit }) => {
  const location = useLocation();
  const originalData = location.state?.originalData;
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
        nombre: productData.nombre || "",
        descrip: productData.descrip || "",
        stock: productData.stock || 0,
        iva: productData.iva || "",
        categoria: productData.categoria || "",
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
    <form onSubmit={handleSubmit}>
      <label>
        Nombre del producto:
        <input
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={handleInputChange}
          placeholder="Nombre del producto"
        />
      </label>
      <br />
      <label>
        Descripción:
        <input
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
        <input
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
        <input
          type="number"
          name="IVA"
          value={formData.iva}
          onChange={handleInputChange}
          placeholder="Stock"
          readOnly
        />
      </label>
      <br />
      <label>Categoría</label>
      <select
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
      <button type="submit">Guardar cambios</button>
    </form>
  );
};

export default EditProductForm;
