import React, { createContext, useState } from 'react';

export const DataContext = createContext(null);

export default function DataProvider({ children }) {
  const [data, setData] = useState([]);
  const [activeSheet, setActiveSheet] = useState("");

  return (
    <DataContext.Provider value={{ data, activeSheet, setData, setActiveSheet }}>
      {children}
    </DataContext.Provider>
  );
}