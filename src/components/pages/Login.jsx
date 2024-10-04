// src/components/Login.jsx
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { loginApi } from "../../utils/apis";
import Page from "../common/Page";
import Input from "../common/ui/Input";
import "../../styles/Page.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = await loginApi(email, password);
      login(token);
      alert("Login successful!");
      navigate("/select-bank-account");
    } catch (error) {
      console.error("Login error:", error?.response?.data?.message);
      alert("Login failed.");
    }
  };

  return (
    <Page>
      <div className="flex flex-wrap">
        {/* Image Container */}
        <div className="md:w-1/2">
          <img
            className="object-cover login-image"
            src="src/assets/login-image.webp"
            alt="Login"
          />
        </div>

        {/* Login Form Container */}
        <div className="flex items-center justify-center p-8 md:w-1/2">
          <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
            {/* Email Input */}
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              label="Email address"
              className="w-full px-3 py-2 border bg-white text-black border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />

            {/* Password Input */}
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              label="Password"
              className="w-full px-3 py-2 border bg-white  text-black border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </Page>
  );
}

export default Login;
