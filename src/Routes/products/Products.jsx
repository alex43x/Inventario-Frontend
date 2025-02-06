import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Link, Outlet } from "react-router-dom";
import Product from "./productContainer";

const Productos = () => {
  const [categorias, setCategorias] = useState([]);
  const [productos, setProductos] = useState([]);
  const [page, setPage] = useState(1);
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
  const fetchProducts = useCallback(async (reset = false, newPage = 1) => {
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
      setProductos((prev) => (reset ? response.data : [...prev, ...response.data]));
    } catch (error) {
      console.error("Error al obtener productos:", error);
    }
  }, [searchName, searchCategory]); // Dependencias: searchName y searchCategory

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

  return (
    <div>
      <section className="text-green-800 text-center m-10">
        <h1 className="text-8xl font-bold">Productos</h1>
        <p className="text-lg m-8">Ver los productos disponibles</p>
      </section>
      <div className="flex flex-wrap">
        <aside className="text-green-800 text-left m-3 p-3 w-1/5">
          <div className="border-2 border-green-600 rounded-lg p-5">
            <h3 className="text-2xl font-bold">Buscar</h3>
            <label>Por nombre:</label>
            <br />
            <input
              className="w-full"
              type="text"
              placeholder="Buscar por nombre"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
            />
            <br />
            <label>Por categoría:</label>
            <select
              className="w-full"
              value={searchCategory}
              onChange={(e) => setSearchCategory(e.target.value)}
            >
              <option value="">Todas las categorías</option>
              {categorias.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.nombre}
                </option>
              ))}
            </select>
          </div>
          <section className="mt-4 rounded-lg flex flex-wrap text-gray-100">
            <Link to="addProduct">
              <button className="mx-auto self-center p-4 rounded bg-green-700 hover:bg-green-600">
                Añadir Producto
              </button>
            </Link>
            <Outlet />
            <Link to="/home">
              <button className="block mx-auto self-center p-4 rounded bg-green-700 hover:bg-green-600">
                Regresar
              </button>
            </Link>
            {hasMore && (
              <button
                onClick={loadMore}
                className={`bg-green-600 text-white p-2 rounded ${
                  !hasMore && "opacity-50 cursor-not-allowed"
                }`}
                disabled={!hasMore}
              >
                Cargar más productos
              </button>
            )}
          </section>
        </aside>
        <section className="text-green-800 text-center p-3 flex-1">
          <ul className="flex justify-center flex-wrap">
            {productos.map((producto) => (
              <Product
                key={producto.id_prod}
                name={producto.nombre}
                description={producto.descrip}
                stock={producto.stock}
                producto={producto}
              />
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
};

export default Productos;