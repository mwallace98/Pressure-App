import React from "react";


function Map({lat,long}){

    const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';

    if (!lat || !long) {
       return (
      <div style={{ textAlign: "center", marginTop: "1rem", color: "red" }}>
        <p> Address is required to display the map.</p>
      </div>
    );
  }
      return (
        <>
        <div className="map-container"> 
          <img
              src={`${backendUrl}/api/maps?lat=${lat}&lng=${long}&zoom=14&maptype=terrain`}
              alt="Dynamic Map"
          />
      </div>
      </>
    )  
}


export default Map