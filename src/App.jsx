import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Login from './Routes/login/Login';
import Dashboard from './Routes/dashboard/Dashboard';
import Productos from './Routes/productos/Products';

import ProtectedRoute from './Routes/components/protectedRoute';
import { AuthProvider } from './Routes/components/authContext';
import AddProduct from './Routes/productos/addProduct';
import EditProduct from './Routes/productos/editProduct';
import SeeMore from './Routes/productos/seeMore';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/home"
            element={
                <Dashboard/>
            }
          />
          <Route
            path="/Productos"
            element={
                <Productos/>
            }
          />
          <Route
            path="/Productos/addProduct"
            element={
                <AddProduct/>
            }
          />
          <Route
            path="/Productos/editProduct"
            element={
                <EditProduct/>
            }
          />
          <Route
            path="*"
            element={
              <h1>404 Not Found</h1>
            }/>

          <Route path="/Productos/seeMore" element={<SeeMore/>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
