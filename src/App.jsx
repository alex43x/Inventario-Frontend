import React from "react";
import { BrowserRouter as Router, Route, Routes,Navigate } from "react-router-dom";

import Login from "./Routes/login/Login";
import Dashboard from "./Routes/dashboard/Dashboard";
import Productos from "./Routes/products/Products";
import Ventas from "./Routes/sales/sales";

import AddProduct from "./Routes/products/addProduct";
import EditProduct from "./Routes/products/editProduct";
import SeeMore from "./Routes/products/seeMore";
import AddBatch from "./Routes/inventory/addBatch";
import NewSale from "./Routes/sales/newSale";
import MoreSales from "./Routes/sales/seeMoreSales";

import Layout from "./Routes/components/layout";
import ProtectedRoute from "./Routes/components/protectedRoute";
import { AuthProvider } from "./Routes/components/authContext";
import Clientes from "./Routes/customers/customers";
import SeeMoreCustomers from "./Routes/customers/seeMore";
import AddCustomer from "./Routes/customers/addCustomer";
import EditCustomer from "./Routes/customers/editCustomer";
import Reportes from "./Routes/reports/Reports";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Página de login, fuera del layout y sin protección */}
          <Route path="/login" element={<Login />} />

          {/* Rutas protegidas con el layout */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            {/* Rutas hijas dentro del layout */}
            <Route path="/" element={<Navigate to="home" />} />
            <Route path="home" index element={<Dashboard />} />
            <Route path="Productos" element={<Productos />} />
            <Route path="Productos/addProduct" element={<AddProduct />} />
            <Route path="Productos/editProduct" element={<EditProduct />} />
            <Route path="Productos/seeMore" element={<SeeMore />} />
            <Route path="Inventario/addBatch" element={<AddBatch />} />

            <Route path="Ventas" element={<NewSale />} />
            <Route path="Ventas/VerMas" element={<MoreSales />} />
            <Route path="Clientes" element={<Clientes />} />
            <Route path="Clientes/seeMore" element={<SeeMoreCustomers />} />
            <Route path="Clientes/addcustomer" element={<AddCustomer />} />
            <Route path="Clientes/editcustomer" element={<EditCustomer />} />
            <Route path="Reportes" element={<Reportes />} />
          </Route>

          {/* Ruta 404 */}
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}


export default App;
