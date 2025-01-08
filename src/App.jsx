import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Login from './Routes/Login';
import Dashboard from './Routes/Dashboard';
import Productos from './Routes/Products';

import ProtectedRoute from './Routes/components/protectedRoute';
import { AuthProvider } from './Routes/components/authContext';
import AddProduct from './Routes/addProduct';
import EditProduct from './Routes/editProduct';

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
