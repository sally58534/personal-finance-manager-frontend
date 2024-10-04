// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from "react";
import * as jwt_decode from "jwt-decode"; // Ensure this is installed via 'yarn add jwt-decode'

export const AuthContext = createContext({
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
  showSpinner: () => {},
  hideSpinner: () => {},
  loading: true,
});

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const logout = () => {
    localStorage.removeItem("jwtToken");
    setIsAuthenticated(false);
    console.log("User logged out");
  };

  const login = (token) => {
    localStorage.setItem("jwtToken", token);
    setIsAuthenticated(true);
    console.log("User logged in with token:", token);
  };
  const showSpinner = () => {
    setLoading(true);
  };
  const hideSpinner = () => {
    setLoading(false);
  };

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    console.log("Token on mount:", token);

    if (token) {
      try {
        const decoded = jwt_decode.jwtDecode(token);
        console.log("Decoded token:", decoded);
        const currentTime = Date.now() / 1000;
        console.log("Current time:", currentTime);
        console.log("Token expiration time:", decoded.exp);

        if (decoded.exp > currentTime) {
          setIsAuthenticated(true);
          console.log("isAuthenticated set to true");
        } else {
          console.log("Token expired");
          logout();
        }
      } catch (error) {
        console.error("Error decoding token:", error);
        logout();
      }
    } else {
      console.log("No token found");
    }

    setLoading(false);
    console.log("Loading set to false");
  }, []);

  useEffect(() => {
    console.log("isAuthenticated changed to:", isAuthenticated);
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        loading,
        showSpinner,
        hideSpinner,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
