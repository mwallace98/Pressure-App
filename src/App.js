import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import Map from './Components/map';
import Search from './Components/search';


function App() {

  const [weatherData,setWeatherData] = useState({})
  const [lat,setLat] = useState('')
  const [long,setLong] = useState('')


  const fetchWeather = (latValue,longValue) => {
     const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';
     axios.get(`${backendUrl}/api/weather`, {
    params: {
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
          <Search />
        </div>
        {weatherData.main ? (
          <div className="weather-card">
            <p><strong>Temperature:</strong> {(weatherData.main.temp * 9/5 + 32).toFixed(0)}°F</p>
            <p><strong>Pressure:</strong> {(weatherData.main.pressure / 33.89).toFixed(2)} inHg</p>
            <p><strong>Humidity:</strong> {weatherData.main.humidity}%</p>
            <p><strong>Wind Speed: {weatherData.wind.speed} MPH</strong></p>
          </div>
        ) : (
          'Enter address'
        )}
        
        <Map lat={lat} long={long}/>
      </header>
    </div>
  );
}

export default App;
