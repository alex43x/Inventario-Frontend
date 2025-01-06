import React from "react";

const Product = ({name="Error",description="Error",stock=0}) => {
  return (
    <div className="submenu">
            <h2>{name}</h2>
            <p>{description}</p>
            <p>Disponible: {stock}</p>
    </div>
  );
}

export default Product;