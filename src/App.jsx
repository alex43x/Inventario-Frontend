import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Valform from "./components/ValidationForm";
import './App.css';

const App = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Consume la API del backend
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
          <li key={user.id_user}>{user.id_user}  {user.password}</li> // Muestra los datos
        ))}
      </ul>
      <div>
        <Valform />
      </div>
    </div>
  );
};

export default App;

