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
        <nav className="lg:mt-5 lg:ml-10 flex flex-wrap">
          <a className="text-lg lg:ml-6 text-sky-950 hover:text-sky-800" href="/Home">Dashboard</a>
          <a className="text-lg ml-8 text-sky-950 hover:text-sky-800" href="/Productos">Productos</a>
          <a className="text-lg ml-8 text-sky-950 hover:text-sky-800" href="/Ventas">Ventas</a>
          <a className="text-lg ml-8 text-sky-950 hover:text-sky-800" href="/Clientes">Clientes</a>
          <div className="flex-1 lg:mx-5 ">
            <button className="text-lg text-sky-950 hover:text-sky-800 ml-auto mr-5 " onClick={handleLogout}>
              Cerrar Sesión
            </button>
          </div>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
