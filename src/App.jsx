import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Consumir la API del backend
    axios.get('http://localhost:3000/users')
      .then((response) => {
        setUsers(response.data); // Guardar los usuarios en el estado
      })
      .catch((error) => {
        console.error('Error al obtener los usuarios:', error);
      });
  }, []);

  return (
    <div>
      <h1>Lista de usuarios</h1>
      <ul>
        {users.map((user) => (
          <li key={user.user_id}>{user.password}</li> // Ajusta las propiedades según tu base de datos
        ))}
      </ul>
    </div>
  );
};

export default App;

