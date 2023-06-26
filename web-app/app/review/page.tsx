"use client";
import React, { useState, useContext, useEffect } from "react";
import { useI18nContext } from "@/i18n/i18n-react";
import { DataContext } from "@/contexts/data";
import { Message } from "primereact/message";
import { Accordion, AccordionTab } from "primereact/accordion";
import { Timeline } from 'primereact/timeline';
import processData from "@/misc/process_data";
import { PreSettingsContext } from "@/contexts/pre-settings";
import EventTemplate from "@/components/event-template";

export default function Review() {
  const { LL } = useI18nContext();

  const { columnNames, indicators } = useContext(PreSettingsContext);

  const { data, activeSheet } = useContext(DataContext);
  const [filteredData, setFilteredData] = useState({} as any)
  const [processedData, setProcessedData] = useState({} as any)

  useEffect(() => {
    if (data && Array.isArray(data) && data.length > 0 && activeSheet) {
      const filteredData = data.filter((sheet: any) => sheet.sheetName === activeSheet)[0].data;
      setFilteredData(filteredData);

      if (columnNames && Object.keys(columnNames).length > 0) {
        setProcessedData(processData(filteredData, columnNames, indicators));
      } else {
        console.log("No column names");
      }
    }
  }, [data, activeSheet, columnNames, indicators])

  useEffect(() => {
    console.log(processedData);
  }, [processedData])


  return (
    <>
      <div className="text-2xl font-bold">Review</div>
      <div className="text-md">
        Im folgenden kannst du deine Daten noch einmal überprüfen. Wenn alles passt, kannst du die Daten über den Slackbot versenden.
      </div>
      {processedData.length > 0 ? (
        <>
          <Accordion activeIndex={0} className="w-full">
          {processedData.map((person: any, index: number) => (
            <AccordionTab header={person.person} key={index} className="w-full">
              <EventTemplate item={person.data} />
            </AccordionTab>
          ))}
        </Accordion>

        </>
      ) : (
        <Message severity="error" text="Es wurden keine Daten gefunden." className="w-full" />
      )}
      <div className="flex flex-col-reverse lg:flex-row gap-4">
      </div>
    </>
  )
}