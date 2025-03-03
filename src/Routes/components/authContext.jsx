import React, { createContext, useState, useContext, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Nuevo estado

  const validateToken = () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      setUser(null);
      setIsAuthenticated(false);
      return;
    }
    try {
      const decoded = jwtDecode(token);
      const tokenExp = decoded.exp * 1000;
      const now = Date.now();

      console.log("Token expira en:", tokenExp, "Ahora:", now);

      if (tokenExp < now) {
        console.log("Token expirado");
        localStorage.removeItem("authToken");
        setUser(null);
        setIsAuthenticated(false);
      } else {
        setUser(decoded);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error("Token inválido", error);
      localStorage.removeItem("authToken");
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    validateToken();
    const interval = setInterval(validateToken, 60000);
    return () => clearInterval(interval);
  }, []);

  const login = (userData, token) => {
    localStorage.setItem("authToken", token);
    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    setUser(null);
    setIsAuthenticated(false);
    window.location.replace("/login");
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
