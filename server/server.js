const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config()

const app = express()
app.use(cors())

const PORT = process.env.PORT || 5000;
const WEATHER_API_KEY = process.env.OPENWEATHER_API_KEY

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

 app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});