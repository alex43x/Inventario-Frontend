import React, { createContext, useState, useContext, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const decodeJWT = (token) => {
  console.log('Antes de decod',token)
  try {
    const decoded = jwtDecode(token);
    console.log('decoded', decoded)
    // Verificar si el token ha expirado
    if (decoded.exp * 1000 < Date.now()) {
      console.error("El token ha expirado");
      return null;
    }
    return decoded;
  } catch (error) {
    console.error("Token inválido");
    return null;
  }
};

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    console.log('antes de mandar', token);
    if (token) {
      // Aquí deberías validar el token con el backend (opcional)
      const userData = decodeJWT(token); // Decodifica el token (usa una librería como jwt-decode)
      if (userData) {
        setUser(userData); // Si el token es válido, guarda al usuario en el contexto
      } else {
        localStorage.removeItem("authToken"); // Si es inválido, limpia el token
      }
    }
  }, []);

  const login = (userData, token) => {
    console.log('En fc login',token)
    localStorage.setItem("authToken", token); // Persiste en el almacenamiento local
    console.log("Se guardó",localStorage.getItem("authToken"))
    setUser(userData); // Guarda los datos del usuario en el estado
  };

  // Función para cerrar sesión
  const logout = () => {
    localStorage.removeItem("authToken"); // Borra del almacenamiento local
    setUser(null); // Limpia el estado del usuario
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );  
};

export const useAuth = () => useContext(AuthContext);
