// src/App.jsx
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Register from "./components/pages/Register";
import Login from "./components/pages/Login";
import PrivateRoute from "./components/PrivateRoute";
import LogoutButton from "./components/LogoutButton";
import SelectAccountPage from "./components/pages/SelectAccountPage";
import "./App.css";
import TransactionPage from "./components/pages/TransactionPage";

function App() {
  return (
    <Router>
      <div className=" flex w-full justify-end">
        <LogoutButton />
      </div>
      <Routes>
        {/* Public Routes */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/select-bank-account" element={<SelectAccountPage />} />
          <Route path="/transactions" element={<TransactionPage />} />
          {/* Add more protected routes here */}
        </Route>
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
