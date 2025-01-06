import { useState } from 'react';
import './styles/app.css';

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
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
      <textarea placeholder="Descripción" value={descrip} onChange={(e) => setDescrip(e.target.value)} />
      <input type="number" placeholder="stock" value={stock} onChange={(e) => setStock(e.target.value)} />
      <button type="submit">Agregar Producto</button>
    </form>
  );
}
