import React, { createContext, useState, useContext, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate(); // Hook para redirigir

  useEffect(() => {
    const validateToken = () => {
      const token = localStorage.getItem("authToken");

      if (!token) {
        console.log("No hay token, redirigiendo a login");
        setUser(null);
        navigate("/login");
        return;
      }

      try {
        const decoded = jwtDecode(token);

        if (decoded.exp * 1000 < Date.now()) {
          console.log("El token ha expirado, eliminando y redirigiendo");
          localStorage.removeItem("authToken");
          setUser(null);
          navigate("/login");
        } else {
          setUser(decoded);
        }
      } catch (error) {
        console.error("Token inválido, eliminando y redirigiendo");
        localStorage.removeItem("authToken");
        setUser(null);
        navigate("/login");
      }
    };

    validateToken();

    const interval = setInterval(validateToken, 5000); // Verifica cada 5 segundos
    return () => clearInterval(interval); // Limpia el intervalo al desmontar
  }, [navigate]);

  const login = (userData, token) => {
    localStorage.setItem("authToken", token);
    setUser(userData);
  };

  const logout = () => {
    console.log("Cerrando sesión");
    localStorage.removeItem("authToken");
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
