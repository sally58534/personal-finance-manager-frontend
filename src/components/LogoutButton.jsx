// src/components/LogoutButton.jsx
import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function LogoutButton() {
  const { logout, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  if (!isAuthenticated) return null;

  return (
    <div className="w-fit">
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default LogoutButton;
