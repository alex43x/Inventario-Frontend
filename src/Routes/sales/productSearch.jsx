import React, { useState, useEffect } from "react";
import axios from "axios";
import ViewBatches from "../inventory/viewBatches";

import flechaderecha from '../../assets/flecha-derecha.png'
import buscar from '../../assets/buscar.png'

const ProductSearch = ({ getData }) => {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");

  const [batches, setBatches] = useState([]);

  // Función para manejar la búsqueda con debounce
  const handleSearch = async (searchTerm) => {
    if (!searchTerm.trim()) {
      setProducts([]); // Si el input está vacío, limpia los resultados
      return;
    }
    try {
      const response = await axios.get(
        `http://localhost:3000/search/products?nombre=${searchTerm}`
      );
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Debounce para limitar las llamadas a la API
  let debounceTimeout;
  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    clearTimeout(debounceTimeout); // Limpiar el timeout previo
    debounceTimeout = setTimeout(() => {
      handleSearch(value); // Hacer la búsqueda con el valor actual
    }, 600); // Esperar 300ms antes de hacer la búsqueda
  };

  const handleOptionClick = (product) => {
    setSelectedProduct(product.nombre);
    console.log(product);
    getData(product);
    setQuery(""); // Opcional: limpiar el input si seleccionas un producto
    setProducts([]); // Ocultar las opciones después de seleccionar
    try {
      axios
        .get(`http://localhost:3000/inventory/${product.id_prod}`)
        .then((response) => {
          console.log("Lotes recibidos: ", response.data);
          setBatches(response.data);
        });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full mx-auto">
      <div className="  flex items-center space-x-2">
        <h1 className="text-left text-2xl font-medium text-blue-950 mb-2">
          Buscar un producto
        </h1>
        <img className="w-6 h-6" src={buscar} alt="" />
      </div>
      <input
        type="text"
        placeholder="Buscar producto..."
        value={query}
        onChange={handleInputChange}
        className="rounded-lg text-sky-950 p-2 mb-1 border-2 border-sky-900 transition duration-200 focus:bg-sky-50 w-full"
      />
      <strong className=" text-lg font-medium mt-2">
        Productos relacionados
      </strong>
      <div className=" mt-2  max-h-60 overflow-auto border-2 rounded-lg border-blue-950 bg-blue-50 break-words">
        {products.map((product) => (
          <div
            key={product.id_prod}
            onClick={() => handleOptionClick(product)}
            className="p-2 hover:bg-blue-100 cursor-pointer "
          >
            {product.nombre}
          </div>
        ))}
      </div>
      <p className="break-words">{selectedProduct} - Lotes Disponibles</p>
      {selectedProduct && <ViewBatches batches={batches} hidden={false} />}
    </div>
  );
};

export default ProductSearch;
