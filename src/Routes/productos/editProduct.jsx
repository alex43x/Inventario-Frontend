import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import EditProductForm from "./editProductForm";

const EditProductPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const{ originalData } = location.state || {};
  console.log("Datos Recibidos:", originalData);

  const handleBack = () => {
    navigate(-1);
  }
  const handleEditSubmit = async (updatedData) => {
    try {
      // Realizar la solicitud PUT con axios
      const response = await axios.put(
        `http://localhost:3000/products/${originalData.id_prod}`,
        updatedData
      );
      console.log("Producto actualizado:", response.data);
      alert("Producto editado con éxito");
      // Redirigir a la página de productos
      console.log('updated',updatedData)
      navigate(-1,{state:{originalData:updatedData}});
    } catch (error) {
      console.error("Error al editar el producto:", error);
      alert("Hubo un error al actualizar el producto");
    }
  };

  if (!originalData) {
    return <p>No se encontraron datos del producto.</p>;
  }

  return (
    <div>
      <h1>Editar Producto</h1>
      <EditProductForm productData={originalData} onSubmit={handleEditSubmit} />
      <button onClick={handleBack}>Regresar</button>
    </div>
  );
};

export default EditProductPage;
