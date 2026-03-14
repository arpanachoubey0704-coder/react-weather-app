import React, { useState } from "react";

function App() {

  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  const searchWeather = async () => {

    const apiKey = "PASTE_YOUR_API_KEY_HERE";

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    const response = await fetch(url);

    const data = await response.json();

    console.log(data);

    setWeather(data);
  };

  return (
    <div style={{textAlign:"center", marginTop:"50px"}}>

      <h1>Weather App</h1>

      <input
        type="text"
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />

      <button onClick={searchWeather}>
        Search
      </button>

      {weather && weather.main && (
        <div style={{marginTop:"20px"}}>

          <h2>{weather.name}</h2>

          <p>Temperature: {weather.main.temp} °C</p>

          <p>Weather: {weather.weather[0].main}</p>

          <p>Humidity: {weather.main.humidity}%</p>

        </div>
      )}

    </div>
  );
}

export default App;