import React, { useState, useEffect, useRef } from "react";

export default function CustomerSearch({ customers, onSelectCustomer }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [isValid, setIsValid] = useState(false);
  const debounceTimeout = useRef(null);

  const handleInputChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      if (term.length > 0) {
        const filtered = customers.filter((customer) =>
          customer.nombre.toLowerCase().includes(term.toLowerCase())
        );
        setFilteredCustomers(filtered);
        setIsValid(false);
      } else {
        setFilteredCustomers([]);
        setIsValid(false);
      }
    }, 300);
  };

  const handleSelectCustomer = (customer) => {
    setSearchTerm(customer.nombre);
    setFilteredCustomers([]);
    setIsValid(true);
    onSelectCustomer(customer);
  };

  const handleClear = () => {
    setSearchTerm(""); // Limpia el campo de búsqueda
    setIsValid(false); // Marca el estado como inválido
    onSelectCustomer(null); // Notifica al padre que no hay cliente seleccionado
  };

  useEffect(() => {
    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, []);

  return (
    <div>
      <div className="flex flex-wrap mt-2 ">
        <label className="ml-2">Cliente: </label>
        <div>
          <input
            type="text"
            placeholder="Nombre del cliente"
            className="rounded-md text-sky-950 pl-2 border-2 border-sky-900 transition duration-200 focus:bg-sky-100 lg:mx-2"
            value={searchTerm}
            onChange={handleInputChange}
            required
          />
          <button
            type="button"
            onClick={handleClear}
            className="text-gray-300 px-2 rounded backdrop-blur bg-sky-900 transition hover:bg-blue-900 mr-4"
          >
            x
          </button>
        </div>
      </div>

      <div className="relative mt-2 ">
        {/* Lista desplegable */}
        {filteredCustomers.length > 0 && (
          <ul className="absolute bg-white border rounded-md shadow-md w-full max-h-40 overflow-y-auto z-10">
            {filteredCustomers.map((customer, index) => (
              <li
                key={index}
                className="p-2 hover:bg-gray-200 cursor-pointer"
                onClick={() => handleSelectCustomer(customer)}
              >
                {customer.nombre}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
