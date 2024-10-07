import React, { useEffect, useState } from "react";
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
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <Router>
      <div className=" flex w-full justify-end">
        <LogoutButton />
        <button
          className="px-4 py-2 bg-gray-800 text-white dark:bg-gray-200 dark:text-black rounded"
          onClick={toggleDarkMode}
        >
          {darkMode ? "Light mode" : "Dark mode"}
        </button>
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
