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
        <nav className="mt-5">
          <a className="text-lg ml-5 text-green-800 hover:text-green-600" href="/Home">Dashboard</a>
          <button className="text-lg ml-6 text-green-800 hover:text-green-600" onClick={handleLogout}>
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
