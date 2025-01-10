import React from "react";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SeeMore = ({ location }) => {
    const navigate = useNavigate();
    const [product, setProduct] = useState(location.state.product);
    
    return (
        <div>
        <h1>{product.name}</h1>
        <p>{product.description}</p>
        <button onClick={() => navigate(-1)}>Volver</button>
        </div>
    );
}
 export default SeeMore;