import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, Outlet } from "react-router-dom";

import "../styles/app.css";
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
        console.log("Productos recibidos", response.data);
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
      <h1>Productos</h1>
      <p>Ver los productos disponibles</p>
      <section>
        <h3>Buscar</h3>
        <label>Por nombre:</label>
        <input
          type="text"
          placeholder="Buscar por nombre"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
        <br />
        <label>Por categoría:</label>
        <select
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
      </section>
      <br />
      <Link to="addProduct">
        <button>Añadir Producto</button>
      </Link>
      <Outlet />
      <span> </span>
      <Link to="/">
        <button>Regresar</button>
      </Link>
      <ul>
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
    </div>
  );
};

export default Productos;
