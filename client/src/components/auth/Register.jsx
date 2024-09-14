import React, { useState } from "react";
import axiosSource from "../Axios/Axios";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pic, setPic] = useState("");

  const registerUser = (e) => {
    e.preventDefault();

    if (password === confirmPassword) {
      axiosSource
        .post("/register", { name, email, password })
        .then((res) => {
          if (res.data) {
            window.alert("Register Successfully!");
          }
        })
        .catch((err) => {
          window.alert("Register failed!");
        });
    } else {
      window.alert("Password not match!");
    }
  };

  return (
    <div>
      <form onSubmit={registerUser} method="POST" className="auth_form">
        <label htmlFor="">Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Enter your name..."
        />
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
        <label htmlFor="">Confirm Password</label>
        <input
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          type="password"
          placeholder="Enter your confirm password..."
        />
        <label htmlFor="">Upload your picture</label>
        <input
          value={pic}
          onChange={(e) => setPic(e.target.value)}
          type="file"
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Register;
