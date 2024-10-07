import React, { useState } from "react";
import { registerApi } from "../../utils/apis";
import Page from "../common/Page";
import Input from "../common/ui/Input";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerApi(email, password);
      alert("Registration successful!");
    } catch (error) {
      console.error(error);
      alert("Registration failed.");
    }
  };

  return (
    <Page>
      <div className="row justify-content-center">
        <div>
          <form
            onSubmit={handleSubmit}
            className="form-container p-4 shadow-lg rounded bg-white"
          >
            <h2 className="mb-4 text-center">Register</h2>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              label="Email address"
            />
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              label="Password"
            />
            <div className="d-grid mt-3">
              <button type="submit" className="btn btn-primary btn-block">
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </Page>
  );
}

export default Register;
