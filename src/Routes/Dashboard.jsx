import React from 'react';
import './styles/app.css';
import { useAuth } from './components/authContext';
import { useNavigate } from "react-router-dom";
import Section from './components/sections';

const Dashboard = () => {
  const { user } = useAuth(); // Obtiene el usuario actual
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!user) {
      navigate("/login"); // Redirige si el usuario no está autenticado
    }
  }, [user, navigate]);

  if (!user) {
    return <p>Cargando...</p>; // Muestra algo mientras redirige
  }

  return (
    <div>
      <h1>Dashboard {user.name}</h1> {/* Muestra datos del usuario */}
      <p>...</p>
      <Section title='Productos' text='Ver los productos disponibles'/>
      <Section title='Clientes' text='Ver los productos disponibles'/>
      <Section title='Ventas' text='Ver los productos disponibles'/>
      <Section title='Caja' text='Ver los productos disponibles'/>
    </div>
  );
};

export default Dashboard;   