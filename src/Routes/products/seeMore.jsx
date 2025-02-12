import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import ViewBatches from "../inventory/viewBatches";

import axios from "axios";
import Movements from "../dashboard/movements";

import anadir from "../../assets/anadir.png";
import casa from "../../assets/casa.png";
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
      .get(`http://localhost:3000/products/${originalData.id_prod}`)
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
      .get(`http://localhost:3000/inventory/${originalData.id_prod}`)
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
      .get(`http://localhost:3000/sub-sales-product/${originalData.id_prod}`)
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

  const handleDelete = async () => {
    alert(
      "El producto no podrá ser recuperado. Solo puedes eliminar un producto si no tiene lotes activos."
    );
    const confirmDelete = window.confirm(
      "Estas seguro de que deseas eliminar el producto?"
    );
    if (confirmDelete) {
      axios
        .delete(`http://localhost:3000/products/${originalData.id_prod}`)
        .then(() => {
          navigate("/Productos");
        })
        .catch((error) => {
          console.error(error);
          alert("Error: El producto tiene lotes activos");
        });
    } else {
      alert("Eliminación cancelada");
    }
  };

  const deleteBatch = async (lote, stock, producto) => {
    try {
      await axios.put("http://localhost:3000/inventory-cancel", {
        lote,
        stock,
        producto,
      });

      alert("Lote anulado...");

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
      alert("Error en la anulación");
    }
  };

  useEffect(() => {
    if (!originalData?.id_prod) return;

    axios
      .get(`http://localhost:3000/products/${originalData.id_prod}`)
      .then((response) => setProducto(response.data))
      .catch((error) => console.log(error));
  }, [originalData?.id_prod]);

  useEffect(() => {
    if (!originalData?.id_prod) return;

    axios
      .get(`http://localhost:3000/inventory/${originalData.id_prod}`)
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
