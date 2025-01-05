import React from 'react';
import './app.css';
import { useAuth } from './components/authContext';
import Section from './components/sections';

const Dashboard = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Bienvenido al dashboard</p>
      <Section title='Productos' />
      <Section title='Clientes'/>
      <Section title='Ventas' />
      <Section title='Caja'/>
    </div>
  );
};

export default Dashboard;   