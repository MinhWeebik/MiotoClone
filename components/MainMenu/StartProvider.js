import React, { useState, createContext } from "react";

export const StartConext = createContext();
const StartProvider = ({ children }) => {
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
  const [startDay, setStartDay] = useState(getDay(0));
  const value = { startDay, setStartDay };
  return <StartConext.Provider value={value}>{children}</StartConext.Provider>;
};

export default StartProvider;
