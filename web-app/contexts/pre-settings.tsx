import React, { createContext, useState } from 'react';

interface ColumnName {
  name: string;
  type: string;
}

export const PreSettingsContext = createContext(null);

export default function PreSettingsProvider({ children }) {
  const [columnNames, setColumnNames] = useState<ColumnName[]>([
    {
      name: "Uhrzeit",
      type: "time",
    },
    {
      name: "bis",
      type: "until",
    },
    {
      name: "Task",
      type: "task",
    },
    {
      name: "Ort",
      type: "location",
    },
    {
      name: "Beschreibung",
      type: "description",
    },
  ]);

  const [indicators, setIndicators] = useState({
    responsible: "V",
    participant: "T",
    invisible_participant: "U",
    non_participant: "N",
    pure_date: "A"
  });

  return (
    <PreSettingsContext.Provider value={{ columnNames: columnNames, setColumnNames: setColumnNames, indicators, setIndicators }}>
      {children}
    </PreSettingsContext.Provider>
  );
}