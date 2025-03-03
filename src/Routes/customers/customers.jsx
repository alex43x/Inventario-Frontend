import React from "react";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Link, Outlet } from "react-router-dom";

import Customer from "./customerContainer";

import anadir from "../../assets/anadir.png";
import casa from "../../assets/casa.png";
import flechaderecha from "../../assets/flecha-derecha.png";
const Clientes = () => {
  const [clientes, setclientes] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [searchName, setSearchName] = useState(""); // Buscador por nombre

  // Obtener productos con paginación y búsqueda
  const fetchCustomers = useCallback(
    async (reset = false, newPage = 1) => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/customers`, {
          params: {
            search: searchName, // Envía el término de búsqueda
            page: newPage, // Envía la página actual
            limit: 20, // Límite de productos por página
          },
        });

        if (response.data.length === 0) {
          setHasMore(false); // No hay más productos
        } else {
          setHasMore(true); // Aún hay más productos
        }

        // Si es un reset, reemplaza la lista de productos; si no, agrega a la lista existente
        setclientes((prev) =>
          reset ? response.data : [...prev, ...response.data]
        );
      } catch (error) {
        console.error("Error al obtener productos:", error);
      }
    },
    [searchName]
  ); // Dependencias: searchName y

  // Actualiza la lista al cambiar el término de búsqueda o la categoría
  useEffect(() => {
    setPage(1); // Resetear a la primera página cuando cambia la búsqueda
    fetchCustomers(true, 1); // Llama a fetchProducts con reset=true
  }, [searchName, fetchCustomers]);

  // Cargar más productos cuando la página cambia
  useEffect(() => {
    if (page > 1) fetchCustomers(false, page); // Llama a fetchClientes sin reset
  }, [page, fetchCustomers]);

  // Función para cargar más Clientes
  const loadMore = () => {
    if (hasMore) setPage((prev) => prev + 1);
  };

  return (
    <div className="lg:mx-16 mx-8 mt-10">
      <div className="flex flex-wrap flex-1 lg:gap-6 gap-3">
        <section className="text-blue-950 text-left">
          <h1 className="lg:text-7xl text-5xl font-bold ">Clientes</h1>
          <p className="text-xl font-medium my-8"></p>
        </section>
        <div className=" rounded-lg lg:p-5 md:ml-36 ml-auto flex-1 min-w-48">
          <section className=" text-blue-950 m-auto ">
            <h3 className="text-lg font-medium mr-4">Buscar</h3>
            <input
              className=" w-11/12 max-w-72 rounded-lg border-2 p-1 border-blue-950 text-sky-900 hover:bg-blue-50 focus:bg-blue-100 transition"
              type="text"
              placeholder="Nombre del Cliente"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
            />
          </section>
        </div>
        <section className=" lg:ml-auto lg:mr-24 rounded-lg flex flex-wrap p-1  gap-4">
          <div>
            <Link to="addCustomer">
              <button className="mx-auto self-center p-4 rounded-lg flex flex-wrap gap-4 text-gray-100 bg-blue-950 hover:bg-blue-900 trasition duration-500">
                <p className="flex-1">Añadir Cliente</p>
                <img className="w-6 h-6 ml-3 " src={anadir} />
              </button>
            </Link>
          </div>
          <div>
            <Link to="/home">
              <button className="mx-auto self-center p-4 rounded-lg flex text-gray-100 bg-blue-950 hover:bg-blue-900 transition duration-500">
                <p className="flex-1">Ir al inicio</p>
                <img className="w-6 h-6 ml-3 " src={casa} />
              </button>
            </Link>
          </div>
        </section>
      </div>
      <section className="text-green-800 text-center lg:m-3 my-3 flex-1  ">
        <ul className="flex justify-center flex-wrap ">
          {clientes.map((cliente) => (
            <Customer
              key={cliente.id}
              name={cliente.nombre}
              saldo={cliente.saldo}
              cliente={cliente}
            />
          ))}
        </ul>
        {hasMore && (
          <button
            onClick={loadMore}
            className={`bg-blue-950 text-white p-2 rounded ${
              !hasMore && "opacity-50 cursor-not-allowed"
            }`}
            disabled={!hasMore}
          >
            Cargar más clientes
          </button>
        )}
      </section>
    </div>
  );
};

export default Clientes;
