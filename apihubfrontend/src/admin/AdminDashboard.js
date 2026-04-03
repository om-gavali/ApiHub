import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../services/authService";
import TopApis from "../components/TopApis";
import "./Admin.css";

function AdminDashboard() {
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <div className="admin-container">
            <h2>Admin Dashboard</h2>

            <div className="admin-links">
                <Link to="/users">Manage Users</Link>
                <Link to="/apis">Manage APIs</Link>
            </div>

            <div style={{ marginTop: "40px", width: "100%", maxWidth: "800px" }}>
                <TopApis />
            </div>

            <button className="logout-btn" onClick={handleLogout}>
                Logout
            </button>
        </div>
    );
}

export default AdminDashboard;