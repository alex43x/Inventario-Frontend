import React from "react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import EditProductForm from "./editProductForm";
import Swal from "sweetalert2";

const EditProductPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [producto, setProducto] = useState([]);
  const { originalData } = location.state || {};
  console.log("Datos Recibidos:", originalData);

  const handleBack = () => {
    navigate(-1);
  };
  const handleEditSubmit = async (updatedData) => {
    try {
      // Realizar la solicitud PUT con axios
      const response = await axios.put(
        `http://localhost:3000/products-edit/${originalData.id_prod}`,
        updatedData
      );
      console.log("Producto actualizado:", response.data);
      Swal.fire({
        title: "Producto actualizado",
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
      // Redirigir a la página de productos
      console.log("updated", updatedData);
      navigate(-1, { state: { originalData: updatedData } });
    } catch (error) {
      console.error("Error al editar el producto:", error);
      Swal.fire({
        title: "Error",
        showClass: {
          popup: `
            animate__animated
            animate__fadeIn
          `,
        },
        text: "Hubo un error al actualizar el producto",
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
  useEffect(() => {
    axios
      .get(`http://localhost:3000/products/${originalData.id_prod}`)
      .then((response) => {
        console.log("Producto:", response.data);
        setProducto(response.data);
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
      <h1 className="md:text-7xl text-4xl font-bold text-blue-950 text-center my-10 ">
        Editar Producto
      </h1>
      <EditProductForm
        productData={producto}
        onSubmit={handleEditSubmit}
        onBack={handleBack}
      />
    </div>
  );
};

export default EditProductPage;
