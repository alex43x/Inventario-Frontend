import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./authContext";

const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div>Cargando...</div>; // Puedes cambiar esto por un spinner o algo más elegante
  }

  if (!isAuthenticated) {
    console.log("Acceso denegado: Redirigiendo a login...");
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
