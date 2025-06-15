import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {


  const apiKey = '7fc7cb7c2ea8155f7646dd416eb80f02'

  const [weatherData,setWeatherData] = useState({})

  useEffect(() => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
    params: {
      appid: apiKey,
      lat:42.117039,
      lon: -71.864723,
      units: 'metric'
    }
  })
  .then(res => {
    console.log(res.data.main,'data')
    setWeatherData(res.data.main)
  })
  .catch(err => {
    console.log(err,'err')
  })
  },[])

  console.log(weatherData,'weather data')

  return (
    <div className="App">
      <header className="App-header">
        <h1>Weather Info</h1>
        {weatherData.temp ? (
          <div className="weather-card">
            <p><strong>Temperature:</strong> {weatherData.temp * 9/5 + 32}°F</p>
            <p><strong>Pressure:</strong> {(weatherData.pressure / 33.89).toFixed(2)} inHg</p>
            <p><strong>Humidity:</strong> {weatherData.humidity}%</p>
          </div>
        ) : (
          <p>Loading Weather Data...</p>
        )}
      </header>
    </div>
  );
}

export default App;
