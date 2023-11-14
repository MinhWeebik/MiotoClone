import React, { useState, createContext } from "react";

export const SpecificLocationContext = createContext();
const SpecificLocationProvider = ({ children }) => {
  const [latAndLon, setLatAndLon] = useState(null);
  const value = { latAndLon, setLatAndLon };
  return (
    <SpecificLocationContext.Provider value={value}>
      {children}
    </SpecificLocationContext.Provider>
  );
};

export default SpecificLocationProvider;
