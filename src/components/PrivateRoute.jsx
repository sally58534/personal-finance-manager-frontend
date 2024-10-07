import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../styles/Spinner.css";
import Spinner from "./common/Spinner";

function PrivateRoute() {
  const { isAuthenticated, loading } = useContext(AuthContext);

  if (loading) {
    return <Spinner/>
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}

export default PrivateRoute;
