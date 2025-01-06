import React from "react";
import { useState,useEffect } from "react";
import axios from "axios";

import Product from "./components/productContainer";

const Productos=()=>{
    const[productos,setProductos]=useState([]);

    useEffect(()=>{
        axios.get('http://localhost:3000/products')
        .then((response)=>{
            console.log(response.data);
            setProductos(response.data);
        })
        .catch((error)=>{
            console.log(error);
        });
    },[]);

    return(
        <div>
            <h1>Productos</h1>
            <p>Ver los productos disponibles</p>
            <ul>
                {productos.map((producto)=>(
                    <Product key={producto.id_prod} name={producto.nombre} description={producto.descrip} stock={producto.stock}/>
                ))}
            </ul>
        </div>
    );
}

export default Productos;