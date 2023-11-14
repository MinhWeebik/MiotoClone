import React, { useState, createContext } from "react";

export const ArriveLocationContext = createContext();
const ArriveLocationProvider = ({ children }) => {
  const [specificArriveLocation, setSpecificArriveLocation] = useState(null);
  const value = { specificArriveLocation, setSpecificArriveLocation };
  return (
    <ArriveLocationContext.Provider value={value}>
      {children}
    </ArriveLocationContext.Provider>
  );
};

export default ArriveLocationProvider;
