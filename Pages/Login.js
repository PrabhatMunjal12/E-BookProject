import React, {useState} from 'react'
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import '../styles/login.css';

const Login = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const handleLogin = async (e) => {
    e.preventDefault();
    try{
      const res = await axios.post("http://localhost:5000/api/v1/user/login", input);
      alert(res.data.message);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("username", res.data.username);
      navigate("/");
    }catch(error){
      alert(error.response.data.message);
    }
  };
  return (
    <>
    <div className='login-page'>
      <form onSubmit={handleLogin}>
        <h2>Login into your Account</h2>
        <div className='input-container'>
          <label for='email'>Email</label>
          <input 
          type='email' 
          id='email' 
          value={input.email}
          onChange={(e) => setInput({...input, [e.target.name]: e.target.value})}
          name='email' 
          placeholder='Enter your Email'>
          </input>
        </div>
        <div className='input-container'>
          <label for='password'>Password</label>
          <input 
          type='password' 
          id='password' 
          value={input.password}
          onChange={(e) => setInput({...input, [e.target.name]: e.target.value})}
          name='password' 
          placeholder='Enter your Password'>
          </input>
        </div>
        <button type='submit' className='btn btn-primary'>Login</button>
      </form>
    </div>
    </>
  )
}

export default Login;
