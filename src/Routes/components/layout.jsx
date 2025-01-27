// Layout.jsx
import React from "react";
import { useAuth } from "./authContext";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div>
      <header>
        <nav className="mt-5 flex">
          <a className="text-lg ml-5 text-green-800 hover:text-green-600" href="/Home">Dashboard</a>
          <a className="text-lg ml-5 text-green-800 hover:text-green-600" href="/Productos">Productos</a>
          <a className="text-lg ml-5 text-green-800 hover:text-green-600" href="/Ventas">Ventas</a>
          <a className="text-lg ml-5 text-green-800 hover:text-green-600" href="/Clientes">Clientes</a>
          <button className="text-lg text-green-800 hover:text-green-600 ml-auto mr-5" onClick={handleLogout}>
            Cerrar Sesión
          </button>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
