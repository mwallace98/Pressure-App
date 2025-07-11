import React from "react";

function Search({address,setAddress}){

    
    
    return (
            <div>
                <input
                    type="search"
                    placeholder="Search for a location"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)} />
            </div>
    )
}

export default Search