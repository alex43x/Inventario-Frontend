import React, { createContext, useState, useContext, useEffect } from "react";
import {jwtDecode} from "jwt-decode";
  
export const AuthContext = createContext();
  
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  
  const validateToken = () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      setUser(null);
      window.location.href = "/login";
      return;
    }
    try {
      const decoded = jwtDecode(token);
      console.log("Token expira en:", decoded.exp * 1000, "Ahora:", Date.now());
      if (decoded.exp * 1000 < Date.now()) {
        console.log("Token expirado");
        localStorage.removeItem("authToken");
        setUser(null);
        window.location.href = "/login";
      } else {
        setUser(decoded);
      }
    } catch (error) {
      console.error("Token inválido", error);
      localStorage.removeItem("authToken");
      setUser(null);
      window.location.href = "/login";
    }
  };
  
  useEffect(() => {
    validateToken();
    // Opcional: revisa el token cada minuto
    const interval = setInterval(validateToken, 60000);
    return () => clearInterval(interval);
  }, []);
  
  const login = (userData, token) => {
    localStorage.setItem("authToken", token);
    setUser(userData);
  };
  
  const logout = () => {
    localStorage.removeItem("authToken");
    setUser(null);
    window.location.href = "login";
  };
  
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
  
export const useAuth = () => useContext(AuthContext);
