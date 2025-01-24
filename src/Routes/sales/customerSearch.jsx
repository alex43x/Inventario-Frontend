import React, { useState } from "react";

export default function CustomerSearch({ customers, onSelectCustomer }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [isValid, setIsValid] = useState(false);

  console.log(customers);
  const handleInputChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    // Filtra los clientes que coincidan con el término ingresado
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
  };

  const handleSelectCustomer = (customer) => {
    setSearchTerm(customer.nombre); // Actualiza el input con el nombre seleccionado
    setFilteredCustomers([]); // Limpia las sugerencias
    setIsValid(true);
    onSelectCustomer(customer); // Envía el cliente seleccionado al componente padre
  };

  const handleBlur = () => {
    // Si el cliente no está en la lista, borra el input
    if (!customers.includes(searchTerm)) {
      setSearchTerm(""); // Limpia el campo
      setIsValid(false); // Marca como inválido
      onSelectCustomer(null); // Envía null al padre
    }
  };

  return (
    <div className="relative">
      <label className="inline-flex m-2">Cliente </label>
      <input
        type="text"
        placeholder="Escribe el nombre del cliente"
        className=" rounded-md pl-2 mr-1 w-3/12"
        value={searchTerm}
        onChange={handleInputChange}
        required
      />
      <button
        onClick={handleBlur}
        className=" text-gray-300 self-center text-center px-4  rounded backdrop-blur bg-green-800 transition hover:bg-green-900"
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
              onBlur={handleBlur}
            >
              {customer.nombre}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
