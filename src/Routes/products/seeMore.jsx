import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ViewBatches from "../inventory/viewBatches";
import axios from "axios";
import Movements from "../dashboard/movements";
import Swal from "sweetalert2";

import anadir from "../../assets/anadir.png";
import flechaderecha from "../../assets/flecha-derecha.png";
import flechaizquierda from "../../assets/flecha-izquierda.png";
import registro from "../../assets/registro.png";
import eliminar from "../../assets/eliminar.png";


const SeeMore = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { originalData } = location.state || {};
  const [batches, setBatches] = useState([]);
  const [sales, setSales] = useState([]);
  const [producto, setProducto] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/products/${originalData.id_prod}`)
      .then((response) => {
        setProducto(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  console.log("Producto: ", producto);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/inventory/${originalData.id_prod}`)
      .then((response) => {
        console.log("Lotes recibidos: ", response.data);
        setBatches(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/sub-sales-product/${originalData.id_prod}`)
      .then((response) => {
        console.log("Ventas recibidos: ", response.data);
        setSales(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleEdit = (event) => {
    event.preventDefault();
    navigate("/Productos/editProduct", {
      state: { originalData: producto[0] },
    });
  };



const handleDelete = async (originalData, navigate) => {
  // Confirmación inicial con SweetAlert
  const result = await Swal.fire({
    title: "Eliminar Producto",
    text: "No podrás recuperar el producto. Sólo puedes eliminar un producto si no tiene lotes registrados.",

    showCancelButton: true,
    confirmButtonText: "Sí, eliminar",
    cancelButtonText: "Cancelar",
    allowOutsideClick: false,
    customClass: {
      popup: "bg-sky-50 rounded-lg shadow-xl border-2 border-sky-800",
      title: "text-4xl font-bold text-sky-950",
      text: "text-sky-900 font-medium",
      confirmButton: "bg-blue-950  text-white font-bold py-2 px-4 rounded",
      cancelButton: "bg-blue-950 transition text-white font-bold py-2 px-4 rounded",
    },
  });

  // Si el usuario cancela, detener ejecución
  if (!result.isConfirmed) {
    await Swal.fire({
      title: "Eliminación cancelada",
      icon: "info",
      timer: 1500,
      showConfirmButton: false,
      allowOutsideClick: false,
      customClass: {
        popup: "bg-sky-50 rounded-lg shadow-xl border-2 border-sky-800",
        title: "text-4xl font-bold text-sky-950",
      },
    });
    return;
  }

  // Intentar eliminar el producto
  try {
    console.log(producto)
    await axios.delete(`${import.meta.env.VITE_API_URL}/products/${producto[0].id_prod}`);
    await Swal.fire({
      title: "Producto eliminado",
      text: "El producto fue eliminado con éxito.",
      confirmButtonText: "Continuar",
      allowOutsideClick: false,
      customClass: {
        popup: "bg-sky-50 rounded-lg shadow-xl border-2 border-sky-800",
        title: "text-4xl font-bold text-sky-950",
        confirmButton: "bg-sky-950 focus:bg-sky-900 transition text-white font-bold py-2 px-4 rounded",
      },
    });
  } catch (error) {
    console.error(error);
    await Swal.fire({
      title: "Error",
      text: "No se puede eliminar el producto porque tiene lotes registrados.",
      confirmButtonText: "Continuar",
      allowOutsideClick: false,
      customClass: {
        popup: "bg-sky-50 rounded-lg shadow-xl border-2 border-sky-800",
        title: "text-4xl font-bold text-sky-950",
        confirmButton: "bg-sky-950 focus:bg-sky-900 transition text-white font-bold py-2 px-4 rounded",
      },
    });
  }
};

  const deleteBatch = async (lote, stock, producto) => {
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/inventory-cancel`, {
        lote,
        stock,
        producto,
      });

      Swal.fire({
        title: "Lote anulado",
        showClass: {
          popup: `
            animate__animated
            animate__fadeIn
          `,
        },
        confirmButtonText: "Continuar",
        timer: 2000,
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

      setBatches((prevBatches) =>
        prevBatches.filter((item) => item.id_lote !== lote)
      );
      setProducto((prevProducto) =>
        prevProducto.map((p) =>
          p.id_prod === producto ? { ...p, stock: p.stock - stock } : p
        )
      );
      console.log("Batches actualizados: ", batches);
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Error",
        showClass: {
          popup: `
            animate__animated
            animate__fadeIn
          `,
        },
        text: "No se puede anular el lote",
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
    if (!originalData?.id_prod) return;

    axios
      .get(`${import.meta.env.VITE_API_URL}/products/${originalData.id_prod}`)
      .then((response) => setProducto(response.data))
      .catch((error) => console.log(error));
  }, [originalData?.id_prod]);

  useEffect(() => {
    if (!originalData?.id_prod) return;

    axios
      .get(`${import.meta.env.VITE_API_URL}/inventory/${originalData.id_prod}`)
      .then((response) => {
        console.log("Lotes recibidos: ", response.data);
        setBatches(response.data);
      })
      .catch((error) => console.log(error));
  }, [originalData?.id_prod]);

  const newBatch = () => {
    navigate("/Inventario/addBatch", { state: { originalData: producto[0] } });
  };

  return (
    <div className="flex flex-wrap">
      {producto.map((producto) => (
        <section className="text-blue-950 text-left lg:m-5 py-5 lg:pl-12 px-4">
          <h1 className="text-6xl font-bold break-words lg:max-w-2xl max-w-md">{producto.nombre}</h1>
          <div className="rounded-lg border-2 border-blue-950 my-6">
            <p className="text-xl m-3 font-medium">
              Código:{" "}
              <span className="text-lg m-1 font-normal">
                {producto.id_prod}
              </span>
            </p>
            <p className="text-xl m-3 font-medium">
              Descripción:{" "}
              <span className="text-lg  font-normal">{producto.descrip}</span>
            </p>
            <p className="text-xl m-3 font-medium">
              Stock:{" "}
              <span className="text-lg m-1 font-normal">
                {producto.stock} disponible(s)
              </span>{" "}
            </p>
            <p className="text-xl m-3 font-medium">
              Precio:{" "}
              <span className="text-lg m-1 font-normal">
                ₲ {producto.precio}
              </span>{" "}
            </p>
          </div>
          <div className=" ml-1 flex items-center space-x-2">
            <img className="w-6 h-6" src={flechaderecha} alt="" />
            <h1 className="text-left text-2xl font-medium text-blue-950 mb-2">
              Lotes Activos
            </h1>
          </div>
          <ViewBatches batches={batches} onRemove={deleteBatch} hidden={true} />
          <div className="flex justify-evenly flex-wrap items-center mt-6 ml-1 gap-2">
            <button
              className=" self-center p-4 rounded-lg flex flex-wrap gap-4 text-gray-100 bg-blue-950 hover:bg-sky-900 trasition duration-500"
              type="button"
              onClick={handleEdit}
            >
              <p className="flex-1">Editar</p>
              <img className="w-6 h-6 ml-1 " src={registro} alt="" />
            </button>
            <button
              className=" self-center p-4 rounded-lg flex flex-wrap gap-4 text-gray-100 bg-blue-950 hover:bg-sky-900 trasition duration-500"
              type="button"
              onClick={newBatch}
            >
              <p className="flex-1">Nuevo Lote</p>
              <img className="w-6 h-6 ml-1 " src={anadir} alt="" />
            </button>
            <button
              className=" self-center p-4 rounded-lg flex flex-wrap gap-4 text-gray-100 bg-blue-950 hover:bg-sky-900 trasition duration-500"
              type="button"
              onClick={handleDelete}
            >
              <p className="flex-1">Eliminar Producto</p>
              <img className="w-6 h-6 ml-1 " src={eliminar} alt="" />
            </button>
            <button
              className=" self-center p-4 rounded-lg flex flex-wrap gap-4 text-gray-100 bg-blue-950 hover:bg-sky-900 trasition duration-500"
              type="button"
              onClick={() => navigate(-1)}
            >
              <p className="flex-1">Regresar</p>
              <img className="w-6 h-6 ml-1 " src={flechaizquierda} alt="" />
            </button>
          </div>
        </section>
      ))}
      <aside className="text-blue-950 text-left mt-8 p-5 mx-auto lg:w-5/12 w-full">
        <div className=" ml-1 flex items-center space-x-2">
          <img className="w-6 h-6" src={flechaderecha} alt="" />
          <h1 className="text-left text-2xl font-medium text-blue-950 mb-2">
            Últimas ventas
          </h1>
        </div>
        <Movements datos={sales} col1="Cliente" col3="Fecha/Hora" />
      </aside>
    </div>
  );
};

export default SeeMore;
