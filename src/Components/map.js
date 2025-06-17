import React from "react";


function Map({lat,long}){

   

    if (!lat || !long) {
       return (
      <div style={{ textAlign: "center", marginTop: "1rem", color: "red" }}>
        <p> Latitude and longitude are required to display the map.</p>
      </div>
    );
  }
      return (
        <>
        <h1 style={{ textAlign: "center", marginBottom: "1rem" }}>Map</h1>
        <div className="map-container"> 
          <img
              src={`http://localhost:5000/api/maps?lat=${lat}&lng=${long}&zoom=14&maptype=terrain`}
              alt="Dynamic Map"
          />
      </div>
      </>
    )  
}


export default Map