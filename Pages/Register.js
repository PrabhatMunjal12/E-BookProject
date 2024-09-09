import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import '../styles/register.css';

const Register = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/v1/user/register", input);
      if (res && res.data && res.data.message) {
        alert(res.data.message);
        navigate("/login");
      } else {
        alert('No response data or message');
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        alert(error.response.data.message);
      } else {
        alert('Error occurred');
      }
    }
  };
  return (
    <div className="register-page">
      <form onSubmit={handleSubmit}>
        {/* <h2>Register</h2> */}
        <h2>SIGN UP HERE</h2>
        <div className="input-container">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="username"
            value={input.username}
            onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
            placeholder="Enter your name"
          />
        </div>

        <div className="input-container">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={input.email}
            onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
            placeholder="Enter your email"
          />
        </div>

        <div className="input-container">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={input.password}
            onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
            placeholder="Enter your password"
          />
        </div>

        <button type="submit" className="btn btn-primary">Sign up</button>
      </form>
    </div>
  );
};

export default Register;