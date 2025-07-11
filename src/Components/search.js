import React from "react";
import Autocomplete from 'react-google-autocomplete'

function Search({address,setAddress}){

   
    
    return (
        <>
        {/* <Autocomplete
            apiKey={'AIzaSyBHbASsyhyOztV5Jyv0ESRqFVDIlU3OKmQ'}
            onPlaceSelected={(place) => console.log(place)} 
            onChange={(e) => setAddress(e.target.value)}
            options={{
                types: ["(regions)"],
                componentRestrictions: { country: "us" },
            }}
        /> */}


            <div>
                <input
                    type="search"
                    placeholder="Search for a location"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)} />
            </div></>
    )
}

export default Search