import React, { useState, useEffect } from 'react';
import './app.css';
import axios from 'axios';

const LoginForm = () => {
  const [formData, setFormData] = useState({ id: '', password: '' }); // Estado inicial
  const [error, setError] = useState(''); // Estado para mensajes de error
  const [users, setUsers] = useState([]);

  // Manejar cambios en los inputs
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value, // Actualiza dinámicamente el campo correspondiente
    });
  };

  // Validar y enviar los datos al hacer clic en "Iniciar sesión"
  const handleSubmit = async(event) => {
    event.preventDefault(); // Previene la recarga de la página
    const { id, password } = formData;

    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, password }),
      });
  
    const data = await response.json();
  
      if (response.ok) {
        alert('Inicio de sesión exitoso 🎉');
      } else {
        alert(data.message || 'Credenciales incorrectas');
      }
    } catch (error) {
      alert('Error al conectar con el servidor');
    }
  };

  return (
    <div>
      <h1>Inicio de Sesión</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="id">Usuario:</label>
          <input
            type="text"
            id="id"
            name="id"
            value={formData.id} // Vincula el estado al input
            onChange={handleChange} // Maneja los cambios
            required
          />
        </div>
        <div>
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password} // Vincula el estado al input
            onChange={handleChange} // Maneja los cambios
            required
          />
        </div>
        <button type="submit">Iniciar sesión</button>
        {error && <p style={{ color: 'red' }}>{error}</p>} {/* Muestra errores */}
      </form>
    </div>
  );
};

export default LoginForm;


