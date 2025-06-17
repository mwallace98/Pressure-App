import React,{useEffect} from "react";


function Map({lat,long}){

   

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