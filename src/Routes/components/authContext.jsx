import React, { createContext, useState, useContext, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Nuevo estado

  const validateToken = () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      setUser(null);
      setIsAuthenticated(false);
      setIsLoading(false); // Ya terminó la validación
      return;
    }
    try {
      const decoded = jwtDecode(token);
      const tokenExp = decoded.exp * 1000;
      const now = Date.now();

      if (tokenExp < now) {
        localStorage.removeItem("authToken");
        setUser(null);
        setIsAuthenticated(false);
      } else {
        setUser(decoded);
        setIsAuthenticated(true);
      }
    } catch (error) {
      localStorage.removeItem("authToken");
      setUser(null);
      setIsAuthenticated(false);
    }
    setIsLoading(false); // Ya terminó la validación
  };

  useEffect(() => {
    validateToken();
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
    <AuthContext.Provider value={{ user, isAuthenticated, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
