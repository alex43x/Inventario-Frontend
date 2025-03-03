import React, { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate(); // Reemplaza window.location.href

  const validateToken = () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      setUser(null);
      navigate("/login");
      return;
    }

    try {
      const decoded = jwtDecode(token);
      if (decoded.exp * 1000 < Date.now()) {
        console.log("Token expirado");
        localStorage.removeItem("authToken");
        setUser(null);
        navigate("/login");
      } else {
        setUser(decoded);
      }
    } catch (error) {
      console.error("Token inválido", error);
      localStorage.removeItem("authToken");
      setUser(null);
      navigate("/login");
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      validateToken();
      const interval = setInterval(validateToken, 60000);
      return () => clearInterval(interval);
    }
  }, []);

  const login = (userData, token) => {
    localStorage.setItem("authToken", token);
    setUser(userData);
    navigate("/");
  };

  const logout = () => {
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
