import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Logo from "../img/birdfriendslogo.png";

const Register = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    first_name: "",
    last_name: ""
  });
  const [err, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/auth/register", inputs);
      navigate("/");
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <div>
      <div className="auth">
        <div className="auth-inner">  
          <form>
          <h1>Sign Up</h1>
          <p>Welcome to the #1 Bird Watching Enthusiasts App. Sign up to start sharing your bird findings.</p>
            <label for="first_name">First Name</label>
            <input
              required
              type="text"
              placeholder="First Name"
              name="first_name"
              onChange={handleChange}
            />
            <label for="last_name">Last Name</label>
            <input
              required
              type="text"
              placeholder="Last Name"
              name="last_name"
              onChange={handleChange}
            />
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
            <button onClick={handleSubmit}>Register</button>
            {err && <p>{err}</p>}
            <span>
              Already have an account? <Link to="/login">Login</Link>
            </span>
            
          </form>
          <div className="image_container"><img src={Logo} alt="logo"/></div>
        </div>
      </div>
    </div>
  );
};

export default Register;
