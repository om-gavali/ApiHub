import React, { useState, useEffect } from "react";
import api from "../services/api";
import { logout } from "../services/authService";
import "../styles/ApiSearch.css";

function Dashboard() {

    const [category, setCategory] = useState("");
    const [apis, setApis] = useState([]);
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        fetchAllApis();
        fetchFavorites();
    }, []);


    const fetchAllApis = async () => {
        try {
            const res = await api.get("/apis");

            console.log("API RESPONSE:", res.data);

            if (Array.isArray(res.data)) {
                setApis(res.data);
            } else if (Array.isArray(res.data.content)) {
                setApis(res.data.content);
            } else if (Array.isArray(res.data.data)) {
                setApis(res.data.data);
            } else {
                setApis([]);
            }

        } catch (err) {
            console.error("API fetch error:", err);
        }
    };


    const fetchFavorites = async () => {
        try {
            const res = await api.get("/favorites");
            const ids = res.data.map(fav => fav.apiId);
            setFavorites(ids);
        } catch (err) {
            console.error("Favorite fetch error:", err);
        }
    };

    const categories = [
        "Animals", "Anime", "Anti-Malware", "Art & Design",
        "Authentication & Authorization", "Blockchain", "Books", "Business",
        "Calendar", "Cloud Storage & File Sharing", "Continuous Integration",
        "Cryptocurrency", "Currency Exchange", "Data Validation", "Development",
        "Dictionaries", "Documents & Productivity", "Email", "Entertainment",
        "Environment", "Events", "Finance", "Food & Drink", "Games & Comics",
        "Geocoding", "Government", "Health", "Jobs", "Machine Learning",
        "Music", "News", "Open Data", "Open Source Projects", "Patent",
        "Personality", "Phone", "Photography", "Programming",
        "Science & Math", "Security", "Shopping", "Social",
        "Sports & Fitness", "Test Data", "Text Analysis", "Tracking",
        "Transportation", "URL Shorteners", "Vehicle", "Video", "Weather"
    ];

    const handleChange = async (e) => {
        const selected = e.target.value;
        setCategory(selected);

        if (!selected) {
            fetchAllApis();
            return;
        }

        try {
            const res = await api.get(`/apis/category/${selected}`);

            if (Array.isArray(res.data)) {
                setApis(res.data);
            } else if (Array.isArray(res.data.content)) {
                setApis(res.data.content);
            } else {
                setApis([]);
            }

        } catch (err) {
            console.error(err);
            alert("Error fetching APIs");
        }
    };

    const toggleFavorite = async (apiId) => {
        try {
            if (favorites.includes(apiId)) {
                await api.delete(`/favorites/${apiId}`);
                setFavorites(favorites.filter(id => id !== apiId));
            } else {
                await api.post(`/favorites/${apiId}`);
                setFavorites([...favorites, apiId]);
            }
        } catch (err) {
            console.error(err);
            alert("Error updating favorite");
        }
    };

    return (
        <div className="container">

            <h1>API Directory</h1>

            <button
                className="logout-btn"
                onClick={() => {
                    logout();
                    window.location.href = "/login";
                }}
            >
                Logout
            </button>

            <div className="dropdown">
                <select onChange={handleChange} value={category}>
                    <option value="">All Categories</option>
                    {categories.map((cat, i) => (
                        <option key={i}>{cat}</option>
                    ))}
                </select>
            </div>

            <div className="cards">
                {apis.map((apiItem) => (
                    <div className="card" key={apiItem.id}>

                        <div className="card-header">
                            <h3>{apiItem.name}</h3>

                            <button
                                className="fav-btn"
                                onClick={() => toggleFavorite(apiItem.id)}
                            >
                                {favorites.includes(apiItem.id) ? "★" : "☆"}
                            </button>
                        </div>

                        <p className="desc">{apiItem.description}</p>

                        <p><b>Auth:</b> {apiItem.auth || "None"}</p>
                        <p><b>CORS:</b> {apiItem.cors}</p>
                        <p><b>HTTPS:</b> {apiItem.https ? "Yes" : "No"}</p>

                        <a href={apiItem.link} target="_blank" rel="noreferrer">
                            Visit API
                        </a>

                    </div>
                ))}
            </div>

            {apis.length === 0 && (
                <p className="no-data">No APIs found</p>
            )}

        </div>
    );
}

export default Dashboard;