import axios from "axios";
import React, { useState, useEffect } from "react";
import ViewSales from "./viewSales";

export default function MoreSales() {
  const [sales, setSales] = useState([]);
  const [filteredSales, setFilteredSales] = useState([]);
  const [hiddenStates, setHiddenStates] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const limit = 10; // Número de ventas por página

  const fetchSales = async (search = "", pageNum = 1) => {
    try {
      const response = await axios.get("http://localhost:3000/sales", {
        params: { search, page: pageNum, limit },
      });
      setSales(response.data);
      setFilteredSales(response.data);
    } catch (error) {
      console.error("Error al obtener las ventas:", error);
    }
  };

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

  useEffect(() => {
    fetchSales(searchQuery, page);
  }, [searchQuery, page]);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    setPage(1); // Reiniciar a la primera página cuando se busca
  };

  const toggleHidden = (id) => {
    setHiddenStates((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div>
      <h1 className="text-7xl font-bold text-blue-950 text-center m-8">
        Ventas Registradas
      </h1>
      <div className="flex flex-wrap">
        {/* Sidebar para búsqueda */}
        <aside className="p-4 rounded border-2 border-blue-950 mx-4 my-6 text-blue-950 h-36">
          <h2 className="text-xl font-medium mb-4">Buscar Ventas</h2>
          <input
            type="text"
            placeholder="Buscar por cliente o vendedor..."
            value={searchQuery}
            onChange={handleSearch}
            className="rounded-md text-sky-950 pl-2 border-2 border-sky-900 transition duration-200 focus:bg-sky-100 w-full"
          />
        </aside>

        {/* Contenido principal */}
        <div className="flex-1 w-8/12 mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-blue-950 mr-6">
            {filteredSales.map((sale) => (
              <div
                key={sale.id}
                className="rounded-md border-2 border-blue-950 p-4 w-full flex flex-col"
              >
                <div className="flex border-b-2 border-blue-950 pb-2">
                  <h1 className="text-lg mr-4">
                    <strong>Cliente:</strong> {sale.cliente}
                  </h1>
                  <p className="ml-auto font-semibold text-lg p-1">
                    +₲ {sale.total.toLocaleString("es-ES")}
                  </p>
                  <button
                    className="ml-2 w-8 h-8 rounded-lg border-2 border-blue-900 font-bold text-blue-900"
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
                    <strong>Vendedor:</strong> {sale.vendedor}
                  </p>
                  <p>
                    <strong>Código:</strong> {sale.id}
                  </p>
                </div>
                {hiddenStates[sale.id] && (
                  <div className="mt-2">
                    <ViewSales id={sale.id} getsubsales={getSubsales}/>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Paginación */}
          <div className="flex justify-center mt-6">
            <button
              className="px-4 py-2 mx-2 rounded border-2 border-blue-950 text-blue-950 disabled:opacity-50"
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
              Anterior
            </button>
            <span className="text-xl font-medium px-4">{page}</span>
            <button
              className="px-4 py-2 mx-2 rounded border-2 border-blue-950 text-blue-950"
              onClick={() => setPage(page + 1)}
            >
              Siguiente
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
