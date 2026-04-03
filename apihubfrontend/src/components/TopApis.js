import React, { useEffect, useState } from "react";
import api from "../services/api";
import "./TopApis.css";

function TopApis() {
  const [topApis, setTopApis] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTopApis();
  }, []);

  const fetchTopApis = async () => {
    try {
      const res = await api.get("/apis/top");
      setTopApis(res.data);
    } catch (err) {
      console.error("Failed to load top APIs", err);
    } finally {
      setLoading(false);
    }
  };

  const handleVisit = (apiId) => {
    // Fire and forget hit counter
    api.post(`/apis/${apiId}/visit`).catch(console.warn);
  };

  if (loading) return null;
  if (!topApis || topApis.length === 0) return null;

  return (
    <div className="top-apis-container">
      <h3>🔥 Most Visited APIs</h3>
      <div className="top-apis-grid">
        {topApis.map((a, idx) => (
          <div key={a.id} className="top-api-card">
            <div className="rank">#{idx + 1}</div>
            <div className="api-info">
              <h4>{a.name}</h4>
              <p className="visit-count">👁 {a.visitCount || 0} visits</p>
            </div>
            <a 
              href={a.link} 
              target="_blank" 
              rel="noreferrer" 
              className="visit-btn"
              onClick={() => handleVisit(a.id)}
            >
              Visit
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TopApis;
