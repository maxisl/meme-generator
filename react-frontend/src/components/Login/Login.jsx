import React, { useState } from "react";
import axios from "axios";
import "./Login.css";

const LoginForm = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/users/login", {
        email,
        password,
      });
      const token = response.data.token;
      localStorage.setItem("token", token);
      setIsLoggedIn(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3001/users/register",
        {
          name,
          email,
          password,
        }
      );
      const token = response.data.token;
      localStorage.setItem("token", token);
      setIsLoggedIn(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="login-form">
      <form>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        {isRegistering && (
          <div>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>
        )}
        <div>
          <button
            type="submit"
            onClick={isRegistering ? handleRegister : handleLogin}
          >
            {isRegistering ? "Register" : "Login"}
          </button>
          <button
            type="button"
            onClick={() => setIsRegistering(!isRegistering)}
          >
            {isRegistering
              ? "Already have an account?"
              : "Don't have an account?"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
