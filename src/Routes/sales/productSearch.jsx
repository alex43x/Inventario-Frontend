import React, { useState, useEffect } from "react";
import axios from "axios";
import ViewBatches from "../inventory/viewBatches";

const ProductSearch = ({getData}) => {
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
    try{
        axios.get(`http://localhost:3000/inventory/${product.id_prod}`)
        .then((response) => {
          console.log("Lotes recibidos: ", response.data);
          setBatches(response.data);
        })
    }catch(error){
        console.error(error)
    }
  };

  return (
    <div className="w-full mx-auto">
      <h2 className="text-xl mb-4">Buscar y seleccionar un producto</h2>
      <input
        type="text"
        placeholder="Buscar producto..."
        value={query}
        onChange={handleInputChange}
        className="border p-2 rounded w-full"
      />
      <div className="border border-gray-300 mt-2 rounded max-h-60 overflow-auto">
        <strong>Productos relacionados</strong>
        {products.map((product) => (
          <div
            key={product.id_prod}
            onClick={() => handleOptionClick(product)}
            className="p-2 hover:bg-gray-200 cursor-pointer"
          >
            {product.nombre}
          </div>
        ))}
      </div>
      <p>{selectedProduct} - Lotes Disponibles</p>
      {selectedProduct && (
  
        <ViewBatches batches={batches}/>
      )}
    </div>
  );
};

export default ProductSearch;
