import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUsers, deleteUser } from "../services/adminService";
import "./Users.css";

function Users() {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        const res = await getUsers();
        setUsers(res.data);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            await deleteUser(id);
            loadUsers();
        }
    };

    return (
        <div className="users-container">

            <button className="back-btn" onClick={() => navigate("/admin")}>
                ← Back
            </button>

            <h2>Users</h2>

            <div className="table-wrapper">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Username</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {users.map((u) => (
                            <tr key={u.id}>
                                <td data-label="ID">{u.id}</td>
                                <td data-label="Username">{u.username}</td>

                                <td data-label="Role">
                                    <span
                                        className={
                                            u.roles?.includes("ADMIN")
                                                ? "role-admin"
                                                : "role-user"
                                        }
                                    >
                                        {u.roles?.join(", ") || "USER"}
                                    </span>
                                </td>

                                <td data-label="Action">
                                    <button
                                        onClick={() => handleDelete(u.id)}
                                        disabled={u.roles?.includes("ADMIN")}
                                    >
                                        🗑 Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Users;