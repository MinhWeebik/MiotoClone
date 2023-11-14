import React, { useState, createContext } from "react";

export const DriverTypeContext = createContext();
const DriverTypeProvider = ({ children }) => {
  const [hasDriver, setHasDriver] = useState(false);
  const value = { hasDriver, setHasDriver };
  return (
    <DriverTypeContext.Provider value={value}>
      {children}
    </DriverTypeContext.Provider>
  );
};

export default DriverTypeProvider;
