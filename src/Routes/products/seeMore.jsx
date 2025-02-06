import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import ViewBatches from "../inventory/viewBatches";

import axios from "axios";

const SeeMore = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { originalData } = location.state || {};
  const [batches, setBatches] = useState([]);
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
      setProducto(prevProducto => prevProducto.map(p =>
        p.id_prod === producto ? { ...p, stock: p.stock - stock } : p
      ));
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
    <div>
      {producto.map((producto) => (
        <section className="text-green-800 text-left m-5 p-5">
          <h1 className="text-7xl font-bold ">{producto.nombre}</h1>
          <p className="text-xl mt-5 font-medium">
            Código:{" "}
            <span className="text-lg mt-2 font-normal">{producto.id_prod}</span>
          </p>
          <p className="text-xl mt-2 font-medium">
            Descripción:{" "}
            <span className="text-lg mt-2 font-normal">{producto.descrip}</span>
          </p>
          <p className="text-xl mt-2 font-medium">
            Stock:{" "}
            <span className="text-lg mt-2 font-normal">
              {producto.stock} disponible(s)
            </span>{" "}
          </p>
          <p className="text-xl mt-2 font-medium">
            Precio:{" "}
            <span className="text-lg mt-2 font-normal">
              ₲ {producto.precio}
            </span>{" "}
          </p>
        </section>
      ))}
      <aside className="text-green-800 text-left m-5 p-5">
        <h2 className="text-3xl mb-2 font-bold">Lotes disponibles:</h2>
        <ViewBatches batches={batches} onRemove={deleteBatch} hidden={true}/>
      </aside>
      <section className="flex flex-wrap justify-center text-gray-300">
        <button
          className=" m-2 self-center text-center px-4 h-8 rounded backdrop-blur bg-green-800 transition hover:bg-green-900 "
          onClick={handleEdit}
        >
          Editar
        </button>
        <span> </span>
        <button
          className=" m-2 self-center text-center px-4 h-8 rounded backdrop-blur bg-green-800 transition hover:bg-green-900"
          onClick={newBatch}
        >
          Añadir Lote
        </button>
        <span> </span>
        <button
          className=" m-2 self-center text-center px-4 h-8 rounded backdrop-blur bg-green-800 transition hover:bg-green-900"
          onClick={handleDelete}
        >
          Eliminar
        </button>
        <span> </span>
        <button
          className=" m-2 self-center text-center px-4 h-8 rounded backdrop-blur bg-green-800 transition hover:bg-green-900"
          onClick={() => navigate(-1)}
        >
          Regresar
        </button>
      </section>
    </div>
  );
};

export default SeeMore;
