const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config()

const app = express()
app.use(cors())

const PORT = process.env.PORT || 5000;
const MAP_API_KEY = process.env.MAP_API_KEY
const GEOCODING_API_KEY = process.env.GEOCODING_API_KEY


app.get('/', (req, res) => res.send('Weather API running'));

app.get('/api/weather', async (req,res) => {
    const {lat,lon} = req.query;

if (!lat || !lon) {
    return res.status(400).json({ error: 'Latitude and longitude are required.' });
 }

try {
    const response = await axios.get('https://api.open-meteo.com/v1/forecast',
       {
      params: {
        latitude:lat,
        longitude:lon,
        hourly:['surface_pressure','temperature_2m', 'wind_speed_10m','wind_direction_10m','precipitation'],
        past_days:5,
        forecast_days:1,
        timezone:'auto'
      },
    });
   

    res.json(response.data);
  } catch (error) {
    console.error('Error fetching weather:', error.message);
    res.status(500).json({ error: 'Failed to fetch weather data.' });
  } 

 })

 app.get('/api/maps', async (req,res) => {
  const {lat,lng,zoom = 12, maptype = 'hybrid'} = req.query
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=${zoom}&format=jpeg&size=400x400&maptype=${maptype}&key=${MAP_API_KEY}`,
      { responseType: 'arraybuffer' }
    );

    res.set('Content-Type', 'image/jpeg')
    res.send(response.data)
    
  
  }catch(error){
    console.error('Error fetching Maps:', error.message);
    res.status(500).json({ error: 'Failed to fetch Maps data.' });
  }
})

app.get('/api/address', async (req,res) => {
  const {address} = req.query 

  if(!address) {
    return res.status(400).json({error: 'Missing address parameter'})
  }

  try {
    const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${GEOCODING_API_KEY}`,
    )
    console.log(response.data)
    res.json(response.data)
  }
  catch(err){
      console.log(err)
      res.status(500).json({ error: 'Failed to fetch address data' });
    }
})

 app.get('/api/moon', async (req,res) => {
  const location = req.query

  try{
    const response = await axios.get(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}`)
    console.log(express.response)
    res.json(response.data,'res.data')
  }
  
  catch(err){
      console.log(err)
      res.status(500).json({ error: 'Failed to fetch moon data' });
    }
 })




 app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});