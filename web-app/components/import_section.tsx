import React, { useContext } from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faFileExcel, faGear, faGears, faTable } from "@fortawesome/free-solid-svg-icons";
import { TabMenu } from 'primereact/tabmenu';
import { ListBox } from 'primereact/listbox';
import { useI18nContext } from "@/i18n/i18n-react";
import Excel from "./excel";
import GoogleSheets from "./google_sheets";
import SVG from "./svg";
import { Button } from "primereact/button";
import { DataContext } from "@/contexts/data";
import { Panel } from "primereact/panel";
import Link from "next/link";

export default function ImportSection() {

  const { LL } = useI18nContext();
  const [activeTab, setActiveTab] = useState(0);

  const { data, activeSheet, setData, setActiveSheet } = useContext(DataContext);

  const tabs = [
    { label: 'Google Sheets', icon: (<FontAwesomeIcon icon={faGoogle} className="mr-2" />) },
    { label: 'Microsoft Excel', icon: (<FontAwesomeIcon icon={faFileExcel} className="mr-2" />) },
    { label: 'SVG File', icon: (<FontAwesomeIcon icon={faTable} className="mr-2" />) },
  ];

  return (
    <>
      <Panel header="Daten Import" className="w-full mt-4">
        <div className="flex flex-col gap-4">
          <TabMenu model={tabs} activeIndex={activeTab} onTabChange={(e) => (setActiveTab(e.index), setData(null))} className="w-full" />
          {activeTab === 0 && <GoogleSheets />}
          {activeTab === 1 && <Excel />}
          {activeTab === 2 && <SVG />}
        </div>
      </Panel>
      {data &&
        <Panel header="Mappe auswählen" className="w-full mt-4">
          <div className="flex flex-col gap-4">
            <ListBox
              filter
              value={Array.isArray(data) && data.find((e) => e.sheetName === activeSheet)}
              onChange={(e) => setActiveSheet(e.value.sheetName)}
              options={data}
              optionLabel="sheetName"
              className="w-full"
            />
            <Link href="/pre-settings">
              <Button label="Nachrichten generieren" icon={<FontAwesomeIcon icon={faGear} className="mr-3" />} />
            </Link>
          </div>
        </Panel>
      }
    </>
  )
}