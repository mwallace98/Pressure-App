import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import Map from './Components/map';
import Search from './Components/search';
import Chart from './Components/chart';



function App() {

  const [weatherData,setWeatherData] = useState({})
  const [lat,setLat] = useState('')
  const [long,setLong] = useState('')
  const [address,setAddress] = useState('')
  const [inputAddress, setInputAddress] = useState('')


 
  
  const chartData = weatherData?.hourly?.surface_pressure && weatherData?.hourly?.time
    ?
    weatherData.hourly.surface_pressure.map((pressureValue,i) => (
      {
        name: weatherData.hourly.time[i],
        pressure:pressureValue,
        temperature: weatherData.hourly.temperature_2m
      })) 
      .filter((_,i) => i % 6 === 0):[]

     function getCurrentTemperature(weatherData) {
        if (!weatherData?.hourly?.time || !weatherData?.hourly?.temperature_2m) return null;

        const now = new Date();
        const times = weatherData.hourly.time.map(t => new Date(t));

        const closestIndex = times.reduce((closestIdx, time, idx) =>
          Math.abs(time - now) < Math.abs(times[closestIdx] - now) ? idx : closestIdx,
          0
        );

        const tempC = weatherData.hourly.temperature_2m[closestIndex];
        return (tempC * 9) / 5 + 32;
}
     


  const fetchWeather = (latitude,longitude,) => {
     const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';
     axios.get(`${backendUrl}/api/weather`, {
    params: {
      lat:latitude,
      lon:longitude,
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
    if (!res.data.results || res.data.results.length === 0) {
      console.error("No results from geocoding API");
      return;
    }

    const location = res.data.results[0].geometry.location;
    const shortName = res.data.results[0].address_components[0].short_name

    setLong(location.lng)
    setLat(location.lat)
    setAddress(shortName)
    

    fetchWeather(location.lat,location.lng)
  })
  .catch(err => {
    console.log(err)
  })
}

  return (
    
    <div className="App">

      <header className="App-header">
        
        <h1>
          {weatherData.hourly
            ? `Weather Info for ${address}`
            : ''}
        </h1>
        
      

        <div className='Location-form'>
          <Search address={inputAddress} setAddress={setInputAddress}/>
          <button onClick={() => fetchAddress(inputAddress)}>Search</button>
        </div>
        {weatherData.hourly ? (
          <div className="weather-card">
            <p><strong>Temperature:</strong> {getCurrentTemperature(weatherData).toFixed(1) }°F</p>
            <p><strong>Wind Speed:</strong> {(weatherData.hourly.wind_speed_10m[0])} MPH</p>
          </div>
        ) : 
          'Enter address to Display Weather'
        }
        <Chart data={chartData}/>
        <Map lat={lat} long={long}/>
      </header>
    </div>
  );
}

export default App;
