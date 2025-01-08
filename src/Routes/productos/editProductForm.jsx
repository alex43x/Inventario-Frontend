import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/app.css';

const EditProductForm = ({ productData, onSubmit }) => {
    const location = useLocation();
    const originalData = location.state?.originalData;

    const [formData, setFormData] = useState({
    nombre: originalData?.nombre || '',
    descrip: originalData?.descrip || '',
    stock: originalData?.stock || '',
  });

  // Rellena el formulario con los datos iniciales del producto
  useEffect(() => {
    if (productData) {
      setFormData({
        nombre: productData.nombre || '',
        descrip: productData.descrip || '',
        stock: productData.stock || '',
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
        />
      </label>
      <br />
      <button type="submit">Guardar cambios</button>
    </form>
  );
};

export default EditProductForm;
