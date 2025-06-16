import React,{useEffect} from "react";
import axios from "axios";



function Map(){

     const mapApiKey = process.env.REACT_APP_MAP_API_KEY
     
     const fetchMap = () => {
  axios.get(`https://maps.googleapis.com/maps/api/staticmap?center=42.117039,-71.864723&format=jpg&size=400x400&maptype=hybrid&key=${mapApiKey}`)
  .then(res => {
    console.log(res,'res')
  })
  .catch(err => {
    console.log(err)
  })
}

useEffect(() => {
  fetchMap()
},[])

    return (
        <h1>Map</h1>   
    )  
}

export default Map