import React from "react";
import { Outlet, Link } from "react-router-dom";
import { useAuth } from "./authContext";

const Layout = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div>
      <header>
        <nav className="lg:mt-5 lg:ml-10 flex flex-wrap">
          {/* Usa Link para la navegación interna */}
          <Link className="text-lg lg:ml-6 text-sky-950 hover:text-sky-800" to="/home">
            Dashboard
          </Link>
          <Link className="text-lg ml-8 text-sky-950 hover:text-sky-800" to="/Productos">
            Productos
          </Link>
          <Link className="text-lg ml-8 text-sky-950 hover:text-sky-800" to="/Ventas">
            Ventas
          </Link>
          <Link className="text-lg ml-8 text-sky-950 hover:text-sky-800" to="/Clientes">
            Clientes
          </Link>
          <div className="flex-1 mx-5">
            <button
              className="text-lg text-sky-950 hover:text-sky-800 ml-auto mr-5"
              onClick={handleLogout}
            >
              Cerrar Sesión
            </button>
          </div>
        </nav>
      </header>
      <main>
        {/* Aquí se renderizan las rutas hijas */}
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
