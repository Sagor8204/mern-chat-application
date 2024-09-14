import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosSource from "../Axios/Axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const loginUser = (e) => {
    e.preventDefault();

    axiosSource
      .post("/login", { email, password })
      .then((res) => {
        if (res.data.user) {
          localStorage.setItem("userInfo", JSON.stringify(res.data.user));
          navigate("/chats");
          window.location.reload();
        }
      })
      .catch((err) => {
        window.alert("Login Failed!");
      });
  };

  return (
    <div>
      <form onSubmit={loginUser} className="auth_form" method="POST">
        <label htmlFor="">Email Address</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Enter your email address..."
        />
        <label htmlFor="">Password</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Enter your password..."
        />
        <button>Login</button>
      </form>
      <button className="guest">Get Guest User Credentials</button>
    </div>
  );
};

export default Login;
