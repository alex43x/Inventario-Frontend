import React from "react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import EditProductForm from "./editProductForm";

const EditProductPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [producto, setProducto]=useState([])
  const { originalData } = location.state || {};
  console.log("Datos Recibidos:", originalData);

  const handleBack = () => {
    navigate(-1);
  };
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
      console.log("updated", updatedData);
      navigate(-1, { state: { originalData: updatedData } });
    } catch (error) {
      console.error("Error al editar el producto:", error);
      alert("Hubo un error al actualizar el producto");
    }
  };
  useEffect(() => {
    axios
      .get(`http://localhost:3000/products/${originalData.id_prod}`)
      .then((response) => {
        console.log("Producto:", response.data);
        setProducto(response.data)
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (!originalData) {
    return <p>No se encontraron datos del producto.</p>;
  }

  return (
    <div>
      <h1 className="text-7xl font-bold text-green-800 m-10 p-5 text-center">
        Editar Producto
      </h1>
      <h3 className="text-2xl font-bold text-green-800 m-2 p-5 text-center">
        Datos del Producto:{" "}
      </h3>
      <EditProductForm productData={producto} onSubmit={handleEditSubmit} />
      <div className="flex justify-center items-center h-full">
        <button
          className="text-gray-300 m-4 self-center text-center px-4 h-8 rounded backdrop-blur bg-green-800 transition hover:bg-green-900"
          onClick={handleBack}
        >
          Regresar
        </button>
      </div>
    </div>
  );
};

export default EditProductPage;
