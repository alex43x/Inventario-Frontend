import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './components/authContext';

function Login() {
  const [id, setid] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Inicio de sesión exitoso:', data);
        login(data); // Llama a la función de login del contexto
        navigate('/dashboard'); // Redirige al dashboard
      } else {
        console.error('Error:', data.message);
        alert(data.message);
      }
    } catch (error) {
      console.error('Error de red:', error);
    }
  };

  return (
    <div>
      <h1>Log-In</h1>
      <p>Ingresa tus datos para iniciar sesión</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="id">Documento: </label>
        <input
          type="text"
          value={id}
          onChange={(e) => setid(e.target.value)}
          required
        />
        <br />
        <label htmlFor="password">Constraseña: </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <br />
        <button type="submit">Iniciar sesión</button>
      </form>
    </div>
  );
}

export default Login;
