import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Link, Outlet } from "react-router-dom";
import Product from "./productContainer";
import Movements from "../dashboard/movements";
import anadir from "../../assets/anadir.png";
import casa from "../../assets/casa.png";
import flechaderecha from "../../assets/flecha-derecha.png";

const Productos = () => {
  const [categorias, setCategorias] = useState([]);
  const [productos, setProductos] = useState([]);
  const [page, setPage] = useState(1);
  const [datos, setDatos] = useState([]);
  const [alertas, setAlertas] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [searchName, setSearchName] = useState("");
  const [searchCategory, setSearchCategory] = useState("");

  // Obtener categorías
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:3000/categories");
        console.log("Categorías:", response.data);
        setCategorias(response.data);
      } catch (error) {
        console.error("Error al obtener categorías:", error);
      }
    };

    fetchCategories();
  }, []);

  // Obtener productos con paginación y búsqueda
  const fetchProducts = useCallback(
    async (reset = false, newPage = 1) => {
      try {
        const response = await axios.get("http://localhost:3000/products", {
          params: {
            search: searchName, // Envía el término de búsqueda
            category: searchCategory, // Envía la categoría seleccionada
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
        setProductos((prev) =>
          reset ? response.data : [...prev, ...response.data]
        );
      } catch (error) {
        console.error("Error al obtener productos:", error);
      }
    },
    [searchName, searchCategory]
  ); // Dependencias: searchName y searchCategory

  // Actualiza la lista al cambiar el término de búsqueda o la categoría
  useEffect(() => {
    setPage(1); // Resetear a la primera página cuando cambia la búsqueda
    fetchProducts(true, 1); // Llama a fetchProducts con reset=true
  }, [searchName, searchCategory, fetchProducts]);

  // Cargar más productos cuando la página cambia
  useEffect(() => {
    if (page > 1) fetchProducts(false, page); // Llama a fetchProducts sin reset
  }, [page, fetchProducts]);

  // Función para cargar más productos
  const loadMore = () => {
    if (hasMore) setPage((prev) => prev + 1);
  };

  useEffect(() => {
    const getMovements = async () => {
      try {
        const response = await axios.get("http://localhost:3000/movements"); // Cambia la URL por la de tu backend
        setDatos(response.data); // Guarda los datos en el estado
        // Indica que la carga ha terminado
      } catch (error) {
        console.error(error); // Indica que la carga ha terminado
      }
    };

    getMovements();
  }, []);

  useEffect(() => {
    const getAlerts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/products-alerts"
        ); // Cambia la URL por la de tu backend
        setAlertas(response.data); // Guarda los datos en el estado
        // Indica que la carga ha terminado
      } catch (error) {
        console.error(error); // Indica que la carga ha terminado
      }
    };

    getAlerts();
  }, []);

  return (
    <div>
      <div className="flex flex-wrap ml-16 mt-10 gap-5">
        <div className="flex flex-wrap flex-1 gap-6">
          <section className="text-blue-950 text-left">
            <h1 className="lg:text-7xl text-3xl font-bold ">Inventario</h1>
            <p className="text-xl font-medium my-8">Productos disponibles:</p>
          </section>
          <div className=" rounded-lg lg:p-5 md:ml-36 ml-auto flex-1 min-w-48">
            <section className=" text-blue-950 m-auto ">
              <h3 className="text-lg font-medium mr-4">Buscar</h3>
              <input
                className=" w-11/12 rounded-lg border-2 p-1 border-blue-950 text-sky-900 hover:bg-blue-50 focus:bg-blue-100 transition"
                type="text"
                placeholder="Nombre del Producto"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
              />
            </section>
            <label className="text-blue-950 font-medium">Por categoría</label>
            <select
              className=" w-11/12 rounded-md p-1 hover:bg-blue-50  transition "
              value={searchCategory}
              onChange={(e) => setSearchCategory(e.target.value)}
            >
              <option className="text-blue-950" value="">
                Todas las categorías
              </option>
              {categorias.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.nombre}
                </option>
              ))}
            </select>
          </div>
          <section className=" ml-auto lg:mr-24 rounded-lg flex flex-wrap p-1 my-auto gap-4">
            <div>
              <Link to="addProduct">
                <button className="mx-auto self-center p-4 rounded-lg flex flex-wrap gap-4 text-gray-100 bg-blue-950 hover:bg-blue-900 trasition duration-500">
                  <p className="flex-1">Añadir Producto</p>
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
      </div>
      <div className="flex flex-wrap ml-16 mt-10 gap-5">
        <section className="text-sky-950 text-center pb-3 lg:w-7/12 w-11/12 lg:border-r-2 border-blue-950">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-1">
            {productos.map((producto) => (
              <Product
                key={producto.id_prod}
                name={producto.nombre}
                description={producto.descrip}
                stock={producto.stock}
                producto={producto}
              />
            ))}
          </div>
          {hasMore && (
            <button
              onClick={loadMore}
              className={`bg-blue-950 text-white p-2 rounded ${
                !hasMore && "opacity-50 cursor-not-allowed"
              }`}
              disabled={!hasMore}
            >
              Cargar más productos
            </button>
          )}
        </section>

        <aside className="text-sky-950 text-left mr-16 px-3 lg:w-4/12  w-full">
          <div className=" ">
            <div className=" ml-1 flex items-center space-x-2">
              <img className="w-6 h-6" src={flechaderecha} alt="" />
              <h1 className="text-left text-2xl font-medium text-blue-950 mb-2">
                Alertas por stock:
              </h1>
            </div>

            <section className="w-full">
              <Movements
                datos={alertas}
                col2="Cant. Disponible"
                col3="Alerta"
              />
            </section>
          </div>
          <div className=" ">
            <div className=" ml-1 mt-4 flex items-center space-x-2">
              <img className="w-6 h-6" src={flechaderecha} alt="" />
              <h1 className="text-left text-2xl font-medium text-blue-950 mb-2">
                Recién Añadido:
              </h1>
            </div>

            <section className="w-full">
              <Movements datos={datos} />
            </section>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Productos;
