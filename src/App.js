import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import Map from './Pages/map';
import { use } from 'react';

function App() {


  const locApiKey = process.env.REACT_APP_LOC_API_KEY
 

  const [weatherData,setWeatherData] = useState({})
  const [lat,setLat] = useState('')
  const [long,setLong] = useState('')


  const fetchWeather = (latValue,longValue) => {
     axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
    params: {
      appid: locApiKey,
      lat:latValue,
      lon:longValue,
      units: 'metric'
    }
  })
  .then(res => {
    setWeatherData(res.data)
  })
  .catch(err => {
    console.log(err,'err')
  })
}


  

 const locations = {
     Oxford: { lat: 42.117039, long:-71.864723, label:'Oxford MA'},
     Douglas: {lat: 42.052819, long: -71.739823, label:'Douglas MA'},
     Greenfield: {lat: 42.587879, long:-72.600258, label: 'Greenfield MA' },
     Conway: {lat: 43.978691,long:-71.126213,label: 'Conway NH'  },
     Narragansett: {lat: 41.433060, long:-71.460182, label: 'Narragansett RI' },
     Sandwich: {lat: 41.757721, long:-70.500137, label: 'Sandwich MA'}
    }


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
            <p><strong>Wind Speed: {weatherData.wind.speed} MPH</strong></p>
          </div>
        ) : (
          <p>Enter Latitude and Longitude</p>
        )}
        <Map />
      </header>
    </div>
  );
}

export default App;
