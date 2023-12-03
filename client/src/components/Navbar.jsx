import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import Logo from "../img/birdfriendslogo.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

const element = <FontAwesomeIcon icon={faPlus} />

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const name = currentUser ? currentUser.first_name + " " + currentUser.last_name : 'login';
  return (
    <div className="navbar">
      {/* <div className="nav-container">
        <div className="logo">
          <Link to="/">
          <img src={Logo} alt="logo" />
          </Link>
        </div>
        <div className="links">
          <span className="write">
            <Link className="link" to="/write">
              {element}
            </Link>
          </span>
          {!currentUser ? (
                <div className="or">
                <Link className="link" to="/login">
                  Login
                </Link> or <Link className="link" to="/register">
                  Register
                </Link></div>
              ) : (
                <DropdownButton id="dropdown-basic-button" title={name}>
                  <Dropdown.Item href="/profile">Your Profile</Dropdown.Item>
                  <Dropdown.Item>
                    <span onClick={logout}>Logout</span>
                  </Dropdown.Item>
                </DropdownButton>
              )}
          
        </div>
      </div> */}
    </div>
  );
};

export default Navbar;
