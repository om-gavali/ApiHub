import React, { useState } from "react";
import axios from "axios";
import "./App.css";

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
      const res = await axios.get(
        `http://localhost:8080/apis/category/${selected}`
      );
      setApis(res.data);
    } catch (err) {
      console.error("Error:", err);
      alert("Error fetching data");
    }
  };

  return (
    <div className="container">

      <h1>API Directory</h1>

      {/* Dropdown */}
      <div className="dropdown">
        <select onChange={handleChange}>
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

            <h2>{api.name}</h2>

            <p className="desc">{api.description}</p>

            <div className="info">
              <span>Category:</span> {api.category}
            </div>

            <div className="info">
              <span>Auth:</span> {api.auth || "None"}
            </div>

            <div className="info">
              <span>CORS:</span> {api.cors}
            </div>

            <div className="info">
              <span>HTTPS:</span>
              <span className="badge https">
                {api.https ? "Yes" : "No"}
              </span>
            </div>

            <a
              href={api.link}
              target="_blank"
              rel="noreferrer"
              className="link"
            >
              Visit API
            </a>

          </div>
        ))}
      </div>

      {/* No Data */}
      {apis.length === 0 && category && (
        <div className="no-data">No APIs found for this category</div>
      )}

    </div>
  );
}

export default ApiSearch;