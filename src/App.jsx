import React, { useState, useEffect } from "react";
import "./App.css";

const CAT_API_URL = "https://api.thecatapi.com/v1/images/search?has_breeds=1";
const CAT_API_KEY = "live_P9Xh1SX4oUtK6N0EkC5N6WZHXGK0GnXsfbP7FitZT7KMTCdlWlgda9bBYioY3BY8";
const MAX_FETCH_ATTEMPTS = 10;

function App() {
  const [currentCat, setCurrentCat] = useState(null);
  const [banList, setBanList] = useState({ origin: [], breed: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [history, setHistory] = useState([]);

  // Fetch a random cat, skipping banned origins and breeds
  const fetchCat = async () => {
    setLoading(true);
    setError("");
    let attempts = 0;
    let cat = null;
    while (attempts < MAX_FETCH_ATTEMPTS) {
      try {
        const res = await fetch(CAT_API_URL, {
          headers: {
            "x-api-key": CAT_API_KEY,
          },
        });
        const data = await res.json();
        if (!data[0] || !data[0].breeds || !data[0].breeds[0]) {
          attempts++;
          continue;
        }
        const breed = data[0].breeds[0];
        if (
          banList.origin.includes(breed.origin) ||
          banList.breed.includes(breed.name)
        ) {
          attempts++;
          continue;
        }
        cat = {
          image: data[0].url,
          breed: breed.name,
          origin: breed.origin,
          temperament: breed.temperament,
        };
        break;
      } catch (err) {
        setError("Failed to fetch cat data.");
        break;
      }
    }
    if (cat) {
      setCurrentCat(cat);
      setHistory((prev) => [cat, ...prev]);
    }
    setLoading(false);
    if (!cat && !error) {
      setError("No cats found that aren't banned. Try removing some bans!");
    }
  };

  // Fetch a cat on first load
  useEffect(() => {
    fetchCat();
    // eslint-disable-next-line
  }, []);

  // Handler to ban an origin or breed
  const handleBan = (type, value) => {
    if (!banList[type].includes(value)) {
      setBanList({ ...banList, [type]: [...banList[type], value] });
    }
  };

  // Handler to unban an origin or breed
  const handleUnban = (type, value) => {
    setBanList({
      ...banList,
      [type]: banList[type].filter((v) => v !== value),
    });
  };

  // Refetch cat if banList changes and current cat is now banned
  useEffect(() => {
    if (
      currentCat &&
      (banList.origin.includes(currentCat.origin) ||
        banList.breed.includes(currentCat.breed))
    ) {
      fetchCat();
    }
    // eslint-disable-next-line
  }, [banList]);

  // Handler to clear all bans
  const handleClearBans = () => {
    setBanList({ origin: [], breed: [] });
  };

  return (
    <div className="App modern-ui">
      <h1>StumbleUpon: Cat Discovery</h1>
      <button onClick={fetchCat} disabled={loading} style={{ marginBottom: 20 }}>
        {loading ? "Loading..." : "Discover"}
      </button>
      {error && <div className="error">{error}</div>}
      {currentCat && !loading && (
        <div className="cat-card modern-card">
          <img src={currentCat.image} alt={currentCat.breed} className="cat-img" />
          <div className="cat-info">
            <div>
              <strong>Breed:</strong>{" "}
              <span
                className="clickable"
                onClick={() => handleBan("breed", currentCat.breed)}
                title="Ban this breed"
                style={{
                  color: banList.breed.includes(currentCat.breed)
                    ? "#aaa"
                    : "#0077cc",
                  cursor: "pointer",
                }}
              >
                {currentCat.breed}
              </span>
            </div>
            <div>
              <strong>Origin:</strong>{" "}
              <span
                className="clickable"
                onClick={() => handleBan("origin", currentCat.origin)}
                title="Ban this origin"
                style={{
                  color: banList.origin.includes(currentCat.origin)
                    ? "#aaa"
                    : "#0077cc",
                  cursor: "pointer",
                }}
              >
                {currentCat.origin}
              </span>
            </div>
            <div>
              <strong>Temperament:</strong> {currentCat.temperament}
            </div>
          </div>
        </div>
      )}
      <div className="ban-list-section modern-card">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2 style={{ margin: 0 }}>Ban List</h2>
          <button className="clear-btn" onClick={handleClearBans} disabled={banList.origin.length === 0 && banList.breed.length === 0}>
            Clear All
          </button>
        </div>
        <div className="ban-list-group">
          <div>
            <strong>Origins:</strong>
            <div className="ban-list">
              {banList.origin.length === 0 ? (
                <span className="ban-item empty">None</span>
              ) : (
                banList.origin.map((origin) => (
                  <span
                    key={origin}
                    className="ban-item"
                    onClick={() => handleUnban("origin", origin)}
                    title="Remove from ban list"
                  >
                    {origin} ✕
                  </span>
                ))
              )}
            </div>
          </div>
          <div>
            <strong>Breeds:</strong>
            <div className="ban-list">
              {banList.breed.length === 0 ? (
                <span className="ban-item empty">None</span>
              ) : (
                banList.breed.map((breed) => (
                  <span
                    key={breed}
                    className="ban-item"
                    onClick={() => handleUnban("breed", breed)}
                    title="Remove from ban list"
                  >
                    {breed} ✕
                  </span>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="history-section modern-card">
        <h2>History</h2>
        {history.length === 0 ? (
          <div className="history-empty">No cats discovered yet.</div>
        ) : (
          <div className="history-list">
            {history.slice(1, 11).map((cat, idx) => (
              <div className="history-item" key={idx}>
                <img src={cat.image} alt={cat.breed} className="history-img" />
                <div className="history-info">
                  <div className="history-breed">{cat.breed}</div>
                  <div className="history-origin">{cat.origin}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
