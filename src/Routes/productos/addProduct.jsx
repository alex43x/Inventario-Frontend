import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AddProduct() {
  const [nombre, setNombre] = useState('');
  const [descrip, setDescrip] = useState('');
  const [stock, setStock] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/products', {
        nombre,
        descrip,
        stock,
      });
      console.log('Producto añadido:', response.data);
      alert('Producto añadido con éxito');
      navigate('/Productos'); // Redirige a la página principal
    } catch (error) {
      console.error('Error al añadir el producto:', error);
      alert('Hubo un error al añadir el producto');
    }
  };

  return (
    <div>
      <h1>Añadir producto</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <br />
        <input
          placeholder="Descripción"
          value={descrip}
          onChange={(e) => setDescrip(e.target.value)}
        />
        <br />
        <input
          type="number"
          placeholder="Stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
        />
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
