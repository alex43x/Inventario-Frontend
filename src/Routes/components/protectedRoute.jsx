import React, { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./authContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext); // Obtiene el usuario del contexto
  const [isLoading, setIsLoading] = useState(true); // Estado para manejar la carga
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken"); // Obtiene el token del localStorage
    console.log('en protected:', token)
    if (user || token) {
      setIsAuthenticated(true); // Si hay usuario o token, está autenticado
    } else {
      setIsAuthenticated(false); // Si no hay usuario ni token, no está autenticado
    }

    setIsLoading(false); // Finaliza la carga
  }, [user]); // Se ejecuta si `user` cambia

  if (isLoading) {
    // Mientras se carga, puedes mostrar un indicador de carga
    return <div>Cargando...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children; // Renderiza los hijos si está autenticado
};

export default ProtectedRoute;
