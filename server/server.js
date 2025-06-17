const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config()

const app = express()
app.use(cors())

const PORT = process.env.PORT || 5000;
const WEATHER_API_KEY = process.env.OPENWEATHER_API_KEY
const MAP_API_KEY = process.env.MAP_API_KEY
const GEOCODING_API_KEY = process.env.GEOCODING_API_KEY


app.get('/', (req, res) => res.send('Weather API running'));

app.get('/api/weather', async (req,res) => {
    const {lat,lon} = req.query;

if (!lat || !lon) {
    return res.status(400).json({ error: 'Latitude and longitude are required.' });
 }

try {
    const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
      params: {
        lat,
        lon,
        units: 'metric',
        appid: WEATHER_API_KEY,
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
    const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json&${address}&key=${GEOCODING_API_KEY}`,
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