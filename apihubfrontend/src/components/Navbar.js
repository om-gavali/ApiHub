import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { logout, getToken } from "../services/authService";
import "../styles/Navbar.css";

function Navbar() {

  const [username, setUsername] = useState("");
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    decodeUser();
  }, []);

  const decodeUser = () => {
    const token = getToken();
    if (!token) return;

    const payload = JSON.parse(atob(token.split(".")[1]));
    setUsername(payload.sub);
  };

  const handleLogout = () => {
    logout();
    window.location.href = "/login";
  };

  return (
    <div className="navbar">

      <div className="nav-left">
        <h2>API Hub</h2>
      </div>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/favorites">Favorites</Link>
      </div>

      <div
        className="user-menu"
        onMouseEnter={() => setShowMenu(true)}
        onMouseLeave={() => setShowMenu(false)}
      >

        <div className="avatar">
          {username ? username.charAt(0).toUpperCase() : "U"}
        </div>

        {showMenu && (
          <div className="dropdown-menu">

            <p className="username">{username}</p>

            <button onClick={handleLogout}>
              Logout
            </button>

          </div>
        )}

      </div>

    </div>
  );
}

export default Navbar;