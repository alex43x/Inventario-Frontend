import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Login from './Routes/login/Login';
import Dashboard from './Routes/dashboard/Dashboard';
import Productos from './Routes/productos/Products';

import ProtectedRoute from './Routes/components/protectedRoute';
import { AuthProvider } from './Routes/components/authContext';
import AddProduct from './Routes/productos/addProduct';
import EditProduct from './Routes/productos/editProduct';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Dashboard/>
              </ProtectedRoute>
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
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
