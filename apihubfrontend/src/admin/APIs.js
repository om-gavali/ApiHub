import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { getApis, deleteApi } from "../services/adminService";
import api from "../services/api";
import "./APIs.css";

function APIs() {
    const [apis, setApis] = useState([]);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        loadApis();
    }, []);

    const loadApis = async () => {
        try {
            setLoading(true);
            const res = await getApis();
            setApis(res.data || []);
        } catch (err) {
            console.error("Error fetching APIs", err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Delete this API?");
        if (!confirmDelete) return;

        try {
            await deleteApi(id);
            setApis((prev) => prev.filter((a) => a.id !== id)); // ⚡ faster than reload
        } catch (err) {
            alert("Delete failed");
        }
    };

    const categories = [
        "Animals", "Anime", "Anti-Malware", "Art & Design",
        "Authentication & Authorization", "Blockchain", "Books", "Business",
        "Calendar", "Cloud Storage & File Sharing", "Continuous Integration",
        "Cryptocurrency", "Currency Exchange", "Data Validation", "Development",
        "Dictionaries", "Documents & Productivity", "Email", "Entertainment",
        "Environment", "Events", "Finance", "Food & Drink", "Games & Comics",
        "Geocoding", "Government", "Health", "Jobs", "Machine Learning", "Music",
        "News", "Open Data", "Open Source Projects", "Patent", "Personality",
        "Phone", "Photography", "Programming", "Science & Math", "Security",
        "Shopping", "Social", "Sports & Fitness", "Test Data", "Text Analysis",
        "Tracking", "Transportation", "URL Shorteners", "Vehicle", "Video", "Weather"
    ];

    // 🔥 Optimized filtering (useMemo)
    const filteredApis = useMemo(() => {
        const searchText = (search || "").toLowerCase();

        return apis.filter((a) => {
            const name = (a.name || "").toLowerCase();
            const url = (a.link || "").toLowerCase();

            const matchesSearch =
                name.includes(searchText) || url.includes(searchText);

            const matchesCategory =
                !category || a.category === category;

            return matchesSearch && matchesCategory;
        });
    }, [apis, search, category]);

    return (
        <div className="admin-container">

            <button className="back-btn" onClick={() => navigate("/admin")}>
                ← Back
            </button>

            <h2>APIs</h2>

            {/* 🔍 Filters */}
            <div className="filters">
                <input
                    type="text"
                    placeholder="Search APIs..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option value="">All Categories</option>
                    {categories.map((cat, i) => (
                        <option key={i}>{cat}</option>
                    ))}
                </select>

            </div>

            {/* ⏳ Loading */}
            {loading ? (
                <p className="loading">Loading APIs...</p>
            ) : (
                <div className="table-wrapper">
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>URL</th>
                                <th>Category</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {filteredApis.map((a) => (
                                <tr key={a.id}>
                                    <td data-label="ID">{a.id}</td>
                                    <td data-label="Name">{a.name}</td>

                                    <td data-label="URL">
                                        <a 
                                          href={a.link} 
                                          target="_blank" 
                                          rel="noreferrer"
                                          onClick={() => {
                                              api.post(`/apis/${a.id}/visit`).catch(console.warn);
                                          }}
                                        >
                                            {a.link}
                                        </a>
                                    </td>

                                    <td data-label="Category">
                                        {a.category || "N/A"}
                                    </td>

                                    <td data-label="Action">
                                        <button onClick={() => handleDelete(a.id)}>
                                            🗑 Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {!loading && filteredApis.length === 0 && (
                <p className="no-data">No APIs found</p>
            )}
        </div>
    );
}

export default APIs;