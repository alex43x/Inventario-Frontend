import axios from "axios";
import React, { useState, useEffect } from "react";
import ViewSales from "./viewSales";

export default function MoreSales() {
  const [sales, setSales] = useState([]);
  const [filteredSales, setFilteredSales] = useState([]);
  const [hiddenStates, setHiddenStates] = useState({});
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3000/sales")
      .then((response) => {
        setSales(response.data);
        setFilteredSales(response.data); // Inicialmente, mostrar todas las ventas
        console.table(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const getSubsales = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/sub-sales-by/${id}`
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const toggleHidden = (id) => {
    setHiddenStates((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    if (query) {
      const filtered = sales.filter((sale) =>
        sale.cliente.toLowerCase().includes(query)
      );
      setFilteredSales(filtered);
    } else {
      setFilteredSales(sales); // Restablece si el campo de búsqueda está vacío
    }
  };

  return (
    <div>
      <h1 className="text-7xl font-bold text-green-800 text-center m-8">
        Ventas Registradas
      </h1>
      <div className="flex">
        {/* Sidebar para búsqueda */}
        <aside className="w-1/6 p-4 rounded border-2 border-green-700 mx-4 my-6 text-green-800 h-36 ">
          <h2 className="text-xl font-bold mb-4">Buscar Ventas</h2>
          <input
            type="text"
            placeholder="Buscar por cliente..."
            value={searchQuery}
            onChange={handleSearch}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-700"
          />
        </aside>

        {/* Contenido principal */}
        <div className="flex-1 mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-green-800 mr-6">
            {filteredSales.map((sale) => (
              <div
                key={sale.id}
                className="rounded-md border-2 border-green-700 p-4 w-full flex flex-col"
              >
                <div className="flex border-b-2 border-green-700 pb-2">
                  <h1 className="text-lg mr-4">
                    <strong>Cliente:</strong> {sale.cliente}
                  </h1>
                  <p className="ml-auto font-semibold text-lg p-1">
                    +₲ {sale.total.toLocaleString("es-ES")}
                  </p>
                  <button
                    className="bg-green-700 ml-2 w-8 h-8 rounded text-white"
                    onClick={() => toggleHidden(sale.id)}
                  >
                    {hiddenStates[sale.id] ? "-" : "+"}
                  </button>
                </div>
                <div className="mt-2">
                  <p>
                    <strong>Fecha:</strong>{" "}
                    {new Date(sale.fecha).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Código:</strong> {sale.id}
                  </p>
                </div>
                {hiddenStates[sale.id] && (
                  <div className="mt-2">
                    <ViewSales
                      key={sale.id}
                      getsubsales={getSubsales}
                      id={sale.id}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
