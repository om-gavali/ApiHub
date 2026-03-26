import React, { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/ApiSearch.css";

function Favorites() {

    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        fetchFavorites();
    }, []);

    const fetchFavorites = async () => {
        try {
            const res = await api.get("/favorites");
            setFavorites(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const removeFavorite = async (apiId) => {
        try {
            await api.delete(`/favorites/${apiId}`);
            fetchFavorites();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="container">

            <h1>⭐ Favorite APIs</h1>

            <div className="cards">
                {favorites.map((fav) => (
                    <div className="card" key={fav.id}>

                        <h3>{fav.api?.name}</h3>
                        <p className="desc">{fav.api?.description}</p>

                        <p><b>Auth:</b> {fav.api?.auth || "None"}</p>
                        <p><b>CORS:</b> {fav.api?.cors}</p>
                        <p><b>HTTPS:</b> {fav.api?.https ? "Yes" : "No"}</p>

                        <a href={fav.api?.link} target="_blank" rel="noreferrer">
                            Visit API
                        </a>

                        <button
                            className="fav-btn remove"
                            onClick={() => removeFavorite(fav.apiId)}
                        >
                            ☆
                        </button>

                    </div>
                ))}
            </div>

            {favorites.length === 0 && (
                <p className="no-data">No Favorites Yet</p>
            )}

        </div>
    );
}

export default Favorites;