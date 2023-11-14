import React, { useState, createContext } from "react";

export const LocationContext = createContext();
const LocationProvider = ({ children }) => {
  const [specificLocation, setSpecificLocation] = useState(null);
  const value = { specificLocation, setSpecificLocation };
  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  );
};

export default LocationProvider;
