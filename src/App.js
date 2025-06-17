import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import Map from './Components/map';
import Search from './Components/search';


function App() {

  const [weatherData,setWeatherData] = useState({})
  const [lat,setLat] = useState('')
  const [long,setLong] = useState('')
  const [address,setAddress] = useState('')
  const [inputAddress, setInputAddress] = useState('')


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

const fetchAddress = (address) => {
  const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';
  axios.get(`${backendUrl}/api/address` , {
    params: {address}
  })
  .then(res => {
    console.log(res.data.results[0].address_components[0].short_name,'res.data')
    setLong(res.data.results[0].geometry.location.lng)
    setLat(res.data.results[0].geometry.location.lat)
    fetchWeather(lat,long)
    setAddress(res.data.results[0].address_components[0].short_name)
  })
  .catch(err => {
    console.log(err)
  })
}

  return (
    
    <div className="App">

      <header className="App-header">
        
        <h1>
          {weatherData.main
            ? `Weather Info for ${address}`
            : ''}
        </h1>
      

        <div className='Location-form'>
          <Search address={inputAddress} setAddress={setInputAddress}/>
          <button onClick={() => fetchAddress(inputAddress)}>Search</button>
        </div>
        {weatherData.main ? (
          <div className="weather-card">
            <p><strong>Temperature:</strong> {(weatherData.main.temp * 9/5 + 32).toFixed(0)}°F</p>
            <p><strong>Pressure:</strong> {(weatherData.main.pressure / 33.89).toFixed(2)} inHg</p>
            <p><strong>Humidity:</strong> {weatherData.main.humidity}%</p>
            <p><strong>Wind Speed: {weatherData.wind.speed} MPH</strong></p>
          </div>
        ) : 
          'Enter address to Display Weather'
        }
        <Map lat={lat} long={long}/>
      </header>
    </div>
  );
}

export default App;
