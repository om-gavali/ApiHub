import React, { useState } from "react";
import api from "../services/api";
import { logout } from "../services/authService";


function ApiSearch() {

  const [category, setCategory] = useState("");
  const [apis, setApis] = useState([]);

  const categories = [
    "Animals","Anime","Anti-Malware","Art & Design",
    "Authentication & Authorization","Blockchain","Books","Business",
    "Calendar","Cloud Storage & File Sharing","Continuous Integration",
    "Cryptocurrency","Currency Exchange","Data Validation","Development",
    "Dictionaries","Documents & Productivity","Email","Entertainment",
    "Environment","Events","Finance","Food & Drink","Games & Comics",
    "Geocoding","Government","Health","Jobs","Machine Learning",
    "Music","News","Open Data","Open Source Projects","Patent",
    "Personality","Phone","Photography","Programming",
    "Science & Math","Security","Shopping","Social",
    "Sports & Fitness","Test Data","Text Analysis","Tracking",
    "Transportation","URL Shorteners","Vehicle","Video","Weather"
  ];

  const handleChange = async (e) => {
    const selected = e.target.value;
    setCategory(selected);

    if (!selected) {
      setApis([]);
      return;
    }

    try {
      const res = await api.get(`/apis/category/${selected}`);
      setApis(res.data);
    } catch (err) {
      console.error(err);
      alert("Error fetching APIs");
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

      {/* Dropdown */}
      <div className="dropdown">
        <select onChange={handleChange} value={category}>
          <option value="">-- Select Category --</option>
          {categories.map((cat, index) => (
            <option key={index} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Cards Grid */}
      <div className="cards">
        {apis.map((api, index) => (
          <div className="card" key={index}>

            <h3>{api.name}</h3>

            <p className="desc">{api.description}</p>

            <p><b>Auth:</b> {api.auth || "None"}</p>
            <p><b>CORS:</b> {api.cors}</p>
            <p><b>HTTPS:</b> {api.https ? "Yes" : "No"}</p>

            <a href={api.link} target="_blank" rel="noreferrer">
              Visit API
            </a>

          </div>
        ))}
      </div>

      {/* No Data */}
      {apis.length === 0 && category && (
        <p className="no-data">No APIs found</p>
      )}

    </div>
  );
}

export default ApiSearch;