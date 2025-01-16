import React from 'react';
import { useNavigate } from "react-router-dom";
import Section from './sections';

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Dashboard</h1> {/* Muestra datos del usuario */}
      <p>...</p>
      <Section title='Productos' text='Ver los productos disponibles'/>
      <Section title='Clientes' text='Ver los productos disponibles'/>
      <Section title='Ventas' text='Ver los productos disponibles'/>
      <Section title='Caja' text='Ver los productos disponibles'/>
    </div>
  );
};

export default Dashboard;   