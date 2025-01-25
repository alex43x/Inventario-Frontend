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
    <div className="relative">
      <label className="inline-flex m-2">Cliente </label>
      <input
        type="text"
        placeholder="Escribe el nombre del cliente"
        className="rounded-md pl-2 mr-1 w-3/12"
        value={searchTerm}
        onChange={handleInputChange}
        required
      />
      <button
        type="button"
        onClick={handleClear} // Llama a la nueva función para limpiar
        className="text-gray-300 self-center text-center px-4 rounded backdrop-blur bg-green-800 transition hover:bg-green-900"
      >
        x
      </button>
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
  );
}
