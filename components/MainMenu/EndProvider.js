import React, { useState, createContext } from "react";

export const EndContext = createContext();
const EndProvider = ({ children }) => {
  const getDay = (date) => {
    let day = new Date();
    let time = "21h00, ";
    if (date === 1) {
      day.setDate(day.getDate() + 1);
      time = "20h00, ";
    }
    var date = day.getDate();
    if (date.toString().length === 1) {
      date = "0" + date;
    }
    var month = day.getMonth() + 1;
    var year = day.getFullYear();
    return time + year + "-" + month + "-" + date;
  };
  const [endDay, setEndDay] = useState(getDay(1));
  const value = { endDay, setEndDay };
  return <EndContext.Provider value={value}>{children}</EndContext.Provider>;
};

export default EndProvider;
