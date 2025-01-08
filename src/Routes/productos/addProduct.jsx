import { useState } from 'react';
import '../styles/app.css';
import { Link, Outlet } from 'react-router-dom';

export default function AddProduct({ onProductAdded }) {
  const [nombre, setNombre] = useState('');
  const [descrip, setDescrip] = useState('');
  const [stock, setStock] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:3000/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({nombre, descrip, stock }),
    });
    const data = await response.json();
    onProductAdded(data); // Actualiza la lista de productos en el estado
  };

  return (
    <div>
    <h1>Añadir producto</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
        <br />
        <input placeholder="Descripción" value={descrip} onChange={(e) => setDescrip(e.target.value)} />
        <br />
        <input type="number" placeholder="stock" value={stock} onChange={(e) => setStock(e.target.value)} />
        <br />
        <br />
        <button type="submit">Agregar Producto</button>
        <br />
      </form>
      <br />
      <a href="/Productos">
          <button>Regresar</button>
      </a>
    </div>
  );
}
