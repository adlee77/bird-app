import axios from "axios";
import React, { useState } from "react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import Logo from "../img/birdfriendslogo.png";

const Login = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const [err, setError] = useState(null);

  const navigate = useNavigate();

  const { login } = useContext(AuthContext);


  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(inputs)
      navigate("/");
    } catch (err) {
      setError(err.response.data);
    }
  };
  return (
    <div className="auth">
      <div className="auth-inner">  
        <form>
          <h1>Login</h1>
          <p></p>
          <label for="email">Email</label>
          <input
            required
            type="text"
            placeholder="email"
            name="email"
            onChange={handleChange}
          />
          <label for="password">Password</label>
          <input
            required
            type="password"
            placeholder="password"
            name="password"
            onChange={handleChange}
          />
          <button onClick={handleSubmit}>Login</button>
          {err && <p>{err}</p>}
          <span>
            Don't have an account?<br/><Link to="/register">Register here</Link>
          </span>
        </form>
        <div className="image_container"><img src={Logo} alt="logo"/></div>
      </div>  
    </div>
  );
};

export default Login;
