import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, Outlet } from "react-router-dom";

import Product from "./productContainer";

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categorias, setCategorias] = useState([]);

  const [searchName, setSearchName] = useState(""); // Buscador por nombre
  const [searchCategory, setSearchCategory] = useState(""); // Buscador por categoría

  useEffect(() => {
    axios
      .get("http://localhost:3000/products")
      .then((response) => {
        console.log("Productos recibidos:", response.data);
        setProductos(response.data);
        setFilteredProducts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  useEffect(() => {
    axios
      .get("http://localhost:3000/categories")
      .then((response) => {
        console.log("Categorías:", response.data);
        setCategorias(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Filtrar productos dinámicamente
  useEffect(() => {
    const filtered = productos.filter((producto) => {
      const matchesName = producto.nombre
        .toLowerCase()
        .includes(searchName.toLowerCase());
      const matchesCategory = searchCategory
        ? producto.categoria === parseInt(searchCategory)
        : true;
      return matchesName && matchesCategory;
    });
    setFilteredProducts(filtered);
  }, [searchName, searchCategory, productos]);

  const getCategoryName = (categoryId) => {
    const category = categorias.find((cat) => cat.id === categoryId);
    return category ? category.nombre : "Sin categoría";
  };

  return (
    <div>
      <section className="text-green-800 text-center m-10">
        <h1 className="text-8xl font-bold">Productos</h1>
        <p className="text-lg m-8">Ver los productos disponibles</p>
      </section>
      <div className="flex flex-wrap">
        <aside className="text-green-800 text-left m-3 p-3 w-1/5 inline-block  ">
          <div className="border-2 border-green-600 rounded-lg p-5" >
            <h3 className="text-2xl font-bold ">Buscar</h3>
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
          <section className=" mt-4 rounded-lg flex flex-wrap text-gray-300">
            <Link to="addProduct">
              <button className=" mx-auto self-center text-center   p-4 m-auto mb-4 mr-4 rounded backdrop-blur bg-green-700 hover:bg-green-600 ">
                Añadir Producto
              </button>
            </Link>
            <Outlet />
            <Link to="/home">
              <button className=" block mx-auto self-center text-center p-4 rounded backdrop-blur bg-green-700 hover:bg-green-600 ">
                Regresar
              </button>
            </Link>
          </section>
        </aside>
        <section className="text-green-800 text-center p-3 flex-1  ">
          <ul className="flex justify-center flex-wrap ">
            {filteredProducts.map((producto) => (
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
