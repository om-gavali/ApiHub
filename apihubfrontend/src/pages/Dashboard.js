import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { getToken } from "../services/authService";
import TopApis from "../components/TopApis";
import "../styles/Dashboard.css";

function Dashboard() {

  const [category, setCategory] = useState("");
  const [apis, setApis] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  const extractData = (data) => {
    if (Array.isArray(data)) return data;
    if (Array.isArray(data.content)) return data.content;
    if (Array.isArray(data.data)) return data.data;
    return [];
  };

  const fetchAllApis = useCallback(async () => {
    try {
      const res = await api.get("/apis");
      setApis(extractData(res.data));
    } catch (err) {
      console.error(err);
    }
  }, []);

  const fetchFavorites = useCallback(async () => {
    try {
      const res = await api.get("/favorites");
      const ids = res.data.map((fav) => fav.apiId);
      setFavorites(ids);
    } catch (err) {
      console.error(err);
    }
  }, []);

  // ✅ FIXED (no infinite loop)
  useEffect(() => {
    const token = getToken();

    if (!token) {
      navigate("/login"); // ✅ FIX
      return;
    }

    fetchAllApis();
    fetchFavorites();
  }, [navigate, fetchAllApis, fetchFavorites]);

  const categories = [
    "Animals", "Anime", "Anti-Malware", "Art & Design", "Authentication & Authorization",
    "Blockchain", "Books", "Business", "Calendar", "Cloud Storage & File Sharing",
    "Continuous Integration", "Cryptocurrency", "Currency Exchange", "Data Validation",
    "Development", "Dictionaries", "Documents & Productivity", "Email", "Entertainment",
    "Environment", "Events", "Finance", "Food & Drink", "Games & Comics", "Geocoding",
    "Government", "Health", "Jobs", "Machine Learning", "Music", "News", "Open Data",
    "Open Source Projects", "Patent", "Personality", "Phone", "Photography", "Programming",
    "Science & Math", "Security", "Shopping", "Social", "Sports & Fitness", "Test Data",
    "Text Analysis", "Tracking", "Transportation", "URL Shorteners", "Vehicle", "Video", "Weather"
  ];

  const handleChange = async (e) => {
    const selected = e.target.value;
    setCategory(selected);

    if (!selected) {
      fetchAllApis();
      return;
    }

    setLoading(true);

    try {
      const res = await api.get(`/apis/category/${selected}`);
      setApis(extractData(res.data));
    } catch (err) {
      alert("Error fetching APIs");
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = async (apiId) => {
    try {
      if (favorites.includes(apiId)) {
        await api.delete(`/favorites/${apiId}`);
        setFavorites(favorites.filter((id) => id !== apiId));
      } else {
        await api.post(`/favorites/${apiId}`);
        setFavorites([...favorites, apiId]);
      }
    } catch (err) {
      alert("Error updating favorite");
    }
  };

  // ✅ SAFE FILTER (no crash)
  const filteredApis = apis.filter((api) =>
    (api.name || "").toLowerCase().includes(search.toLowerCase()) ||
    (api.description || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>

      <div className="header-section">

        <h1>Explore Public APIs</h1>

        <div className="filters">

          <input
            type="text"
            placeholder="Search APIs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select onChange={handleChange} value={category}>
            <option value="">All Categories</option>
            {categories.map((cat, i) => (
              <option key={i}>{cat}</option>
            ))}
          </select>

        </div>

      </div>

      <TopApis />

      {loading && <p className="loading">Loading...</p>}

      <div className="cards">

        {filteredApis.map((apiItem) => (
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

            <a 
              href={apiItem.link} 
              target="_blank" 
              rel="noreferrer"
              onClick={() => {
                api.post(`/apis/${apiItem.id}/visit`).catch(console.warn);
              }}
            >
              Visit API
            </a>

          </div>
        ))}

      </div>

      {!loading && filteredApis.length === 0 && (
        <p className="no-data">No APIs found</p>
      )}

    </div>
  );
}

export default Dashboard;