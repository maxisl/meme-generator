import React, { useState } from "react";
import axios from "axios";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3001/users/login",
        {
          email: email,
          password: password,
        }
      );
      const token = response.data.token;
      localStorage.setItem("token", token);
      props.history.push("/");
    } catch (error) {
      console.log(error);
    }
  };


};

export default Login;
