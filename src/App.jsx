import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Login from "./Routes/login/Login";
import Dashboard from "./Routes/dashboard/Dashboard";
import Productos from "./Routes/productos/Products";

import AddProduct from "./Routes/productos/addProduct";
import EditProduct from "./Routes/productos/editProduct";
import SeeMore from "./Routes/productos/seeMore";
import AddBatch from "./Routes/inventory/addBatch";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<h1>404 Not Found</h1>} />
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Dashboard />} />
        <Route path="/Productos" element={<Productos />} />
        <Route path="/Productos/addProduct" element={<AddProduct />} />
        <Route path="/Productos/editProduct" element={<EditProduct />} />
        <Route path="/Productos/seeMore" element={<SeeMore />} />
        <Route path="/Inventario/addBatch" element={<AddBatch />} />
      </Routes>
    </Router>
  );
}

export default App;
