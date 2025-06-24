# Weather & Map Explorer

A full-stack web application that allows users to search for any address and get:
- Live weather information (temperature, wind, humidity, pressure)
- A dynamic map image centered on the location

Built with React and Node.js, and powered by Google Maps and OpenWeatherMap APIs.

---
## Live Demo

pressure-weather-app.vercel.app
---

## Preview

![image](https://github.com/user-attachments/assets/c0fdd1cd-5a27-4347-8b51-c076edf55697)


---

## Tech Stack

### Frontend
- React
- Axios for HTTP requests
- Custom CSS for styling
- Environment variables

### Backend
- Node.js + Express
- Axios for server-side API requests
- dotenv for secure config management
- CORS enabled

### APIs Used
- OpenWeatherMap API
- Google Maps Static API
- Google Geocoding API
- 

---

## Features

- Display current weather conditions (temperature in Fahrenheit, pressure, humidity, wind speed)
- Search by address
- Render a static map image of the searched location
- Extract and display a short name for the location
- Handle invalid or missing input gracefully
- Organized component-based frontend structure

## Future Improvements
Add lunar data display using Visual Crossing API

Improve user input error handling

Use user's geolocation as default search

Improve responsive design and mobile layout

Cache static map requests to reduce API usage


