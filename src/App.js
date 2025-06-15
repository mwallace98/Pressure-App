import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';


function App() {


  const apiKey = '7fc7cb7c2ea8155f7646dd416eb80f02'

  const [weatherData,setWeatherData] = useState({})
  const[selectedLocation,setSelectedLocation] = useState('home')
  const [lat,setLat] = useState('')
  const [long,setLong] = useState('')

  const locations = {
     Oxford: { lat: 42.117039, long:-71.864723, label:'Oxford MA'},
     Douglas: {lat: 42.052819, long: -71.739823, label:'Douglas MA'}
    }
  const fetchWeather = (latValue,longValue) => {
   

     axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
    params: {
      appid: apiKey,
      lat:latValue,
      lon:longValue,
      units: 'metric'
    }
  })
  .then(res => {
    console.log(res.data,'data')
    setWeatherData(res.data)
  })
  .catch(err => {
    console.log(err,'err')
  })
}

  useEffect(() => {
    fetchWeather()
  },[])

  const handleLocationClick = (locKey) => {
    const loc = locations[locKey];
    const latStr = loc.lat.toString();
    const longStr = loc.long.toString()
    setLat(latStr);
    setLong(longStr);
    fetchWeather(latStr,longStr)
  };

  function resetWeather(){
    setLat(0)
    setLong(0)
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Weather Info for {weatherData.name}</h1>

        <div className="location-buttons">
          {Object.keys(locations).map(key => (
            <button key={key} onClick={() => handleLocationClick(key)}>
              {locations[key].label}
            </button>
          ))}
        </div>
        <div className='Location-form'>
          
          <input 
            type='number'
            value={lat}
            onChange={(e) => setLat(e.target.value)}
            placeholder='Latitude'
          />
          <input 
            type='number'
            value={long}
            onChange={(e) => setLong(e.target.value)}
            placeholder='Longitude'
          />
          <button onClick={() => fetchWeather(lat,long)}>Get Weather</button>
          <button onClick={() => (resetWeather())}>Reset</button>
        </div>
        {weatherData.main ? (
          <div className="weather-card">
            <p><strong>Temperature:</strong> {(weatherData.main.temp * 9/5 + 32).toFixed(0)}°F</p>
            <p><strong>Pressure:</strong> {(weatherData.main.pressure / 33.89).toFixed(2)} inHg</p>
            <p><strong>Humidity:</strong> {weatherData.main.humidity}%</p>
          </div>
        ) : (
          <p>Loading Weather Data...</p>
        )}
      </header>
    </div>
  );
}

export default App;
