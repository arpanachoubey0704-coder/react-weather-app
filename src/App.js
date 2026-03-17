import React, { useState, useEffect } from "react";
import "./App.css";

const customIcons = {
  "01d": "Sun_3208752.png",
  "01n": "cloudy_night_1260226.png",
  "02d": "sunny_sun_cloud_weather_cloudy.png",
  "02n": "cloudy_night_1260226.png",
  "03d": "cloudy_3982205.png",
  "03n": "cloudy_3982205.png",
  "04d": "cloudy_3982205.png",
  "04n": "cloudy_3982205.png",
  "09d": "rainy_1271074.png",
  "10d": "rainy_1271074.png",
  "11d": "lightning_3534815.png",
  "13d": "snowy_7774348 (1).png",
  "50d": "foggy_3621514.png",
};

function App() {
  const [city, setCity] = useState("Bhopal");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const apiKey = "ec7020fc31fa5588e8c2f2d1028f0915";

  const searchWeather = async (customCity) => {
    const cityName = customCity || city;
    if (!cityName) return;

    setLoading(true);
    setError("");

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (response.ok) {
        setWeather(data);
        setCity(data.name);
      } else {
        setError("City not found ❌");
        setWeather(null);
      }
    } catch (err) {
      setError("Something went wrong ⚠️");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    searchWeather("Bhopal");
  }, []);

  return (
    <div className="app">
      <h1>🌤 Weather App</h1>
      <h3>📍 Showing: {city}</h3>

      <div className="search-container">
        <input
          type="text"
          placeholder="Enter city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && searchWeather()}
        />

        <button onClick={searchWeather} disabled={loading}>
          {loading ? "..." : "Search"}
        </button>
      </div>

      {/* Loading */}
      {loading && <p className="info">Loading weather... ⏳</p>}

      {/* Error */}
      {error && <p className="error">{error}</p>}

      {/* Empty */}
      {!weather && !loading && !error && (
        <p className="info">Search a city to see weather 🌍</p>
      )}

      {/* Weather Data */}
      {weather && (
        <div className="card">
          <h2>
            {weather.name}, {weather.sys.country}
          </h2>

          <div className="weather-icon">
            <img
              src={
                customIcons[weather.weather[0].icon]
                  ? process.env.PUBLIC_URL +
                    "/" +
                    customIcons[weather.weather[0].icon]
                  : `https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`
              }
              alt="weather"
              onError={(e) =>
                (e.target.src = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`)
              }
            />
          </div>

          <h1 className="temp">
            {Math.round(weather.main.temp)}°C
          </h1>

          <p className="desc">
            {weather.weather[0].description}
          </p>

          <div className="details">
            <div className="col">
              <p>HUMIDITY</p>
              <strong>{weather.main.humidity}%</strong>
            </div>

            <div className="col">
              <p>WIND SPEED</p>
              <strong>{weather.wind.speed} km/h</strong>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;