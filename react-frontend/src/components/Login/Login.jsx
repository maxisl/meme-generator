import React, { useState } from "react";
import axios from "axios";
import "./Login.css";

const LoginForm = ({ setIsLoggedIn, setUserName }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/auth/login", {
        email,
        password,
      });
      const token = response.data.token;
      console.log(token);
      localStorage.setItem("token", token);
      const userName = email.split('@')[0]; // get username from email
      setUserName(userName);
      console.log(userName);
      setIsLoggedIn(true);
    } catch (error) {
      console.log(error);
      alert(error.response.data.Error);
    }
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/auth/register", {
        name,
        email,
        password,
      });
      const responseData = response.data;
      if (responseData) {
        const token = responseData.token;
        localStorage.setItem("token", token);
        setIsLoggedIn(true);
      } else {
        console.log("Response data is undefined");
      }
    } catch (error) {
      alert(error.response.data.error);
      console.log(error);
    }
  };

  return (
    <div className="login-form">
      <form>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            className="form-input"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-input"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <div className="form-group form-buttons">
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
