import React from "react";
import {Link, Outlet, useNavigate} from "react-router-dom";

const Product = ({name="Error",description="Error",stock=0, deleteProduct, producto}) => {
    const navigate = useNavigate();  

    const handleClick = (event) => {
      event.preventDefault();
      const originalData = producto
      console.log('hola', originalData);
      navigate("/Productos/editProduct", {state: {originalData}});
    };

    const handleDelete = () => {
      deleteProduct(producto.id_prod); // Llama a la función pasada por props
    };

  return (
    <div className="submenu">
            <h2>{name}</h2>
            <p>{description}</p>
            <p>Disponible: {stock}</p>
            <button onClick={handleDelete}>Eliminar</button>
            <Link to = {'editProduct'}>
              <button onClick={handleClick}>Editar</button>
            </Link>
    </div>
  );
}

export default Product;