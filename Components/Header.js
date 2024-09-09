import React from 'react';
// import '../styles/header.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    alert("Logout Success");
    navigate('/login');
  };
  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-light bg-primary">
  <div className="container-fluid">
    <Link className="navbar-brand text-white" to={"/"} >
    CodeWithPrabhat
    </Link>
    <button className="navbar-toggler"
     type="button"
    data-bs-toggle="collapse"
    data-bs-target="#navbarSupportedContent"
    aria-controls="navbarSupportedContent"
    aria-expanded="false"
    aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link text-white" aria-current="page" to={"/"}>
          Home
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-white" to={"/add-blog"}>
          Add Blog
          </Link>
        </li>
        <li className="nav-item dropdown">
          <Link className="nav-link text-white" to={"/add-category"}>
            Add Category
          </Link>
        </li>
      </ul>
      <div className='div-inline mx-auto my-2 my-lg-0'>
        {token && token !== null ? (
        <>
        <button className='btn btn-primary'>Welcome: {username}</button>
        <button onClick={handleLogout} className='btn btn-primary'>Logout</button>
        </>
        ):(
      <>
                <Link to={"/login"}>
                <button className='btn btn-primary'>Login</button>
                </Link>
                <Link to={"/register"}>
                <button className='btn btn-primary'>Register</button>
                </Link>
                </>
        )}
            </div>
    </div>
  </div>
</nav>
    </>
  )
}

export default Header;

