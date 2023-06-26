import { InputText } from "primereact/inputtext";
import { Panel } from "primereact/panel";
import React, { useContext, useState } from "react";
import { PreSettingsContext } from "@/contexts/pre-settings";

export default function Indicators() {

  const { indicators, setIndicators } = useContext(PreSettingsContext);

  return (
    <>
      <Panel header="Indikatoren" className="w-full">
        <div className="flex flex-col gap-4">
          <div className="text-md">
            Hier kannst du einige Indikatoren für die App vornehmen, sofern du etwas ändern möchtest.
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-md font-bold self-center">Nimmt teil (Verantwortlicher)</div>
            <InputText value={indicators.responsible} onChange={(e) => setIndicators({ ...indicators, responsible: e.target.value })} />
            <div className="text-md font-bold self-center">Nimmt teil (Teilnehmer)</div>
            <InputText value={indicators.participant} onChange={(e) => setIndicators({ ...indicators, participant: e.target.value })} />
            <div className="text-md font-bold self-center">Nimmt teil (Unsichtbar)</div>
            <InputText value={indicators.invisible_participant} onChange={(e) => setIndicators({ ...indicators, invisible_participant: e.target.value })} />
            <div className="text-md font-bold self-center">Nimmt nicht teil (Unsichtbar)</div>
            <InputText value={indicators.non_participant} onChange={(e) => setIndicators({ ...indicators, non_participant: e.target.value })} />
            <div className="text-md font-bold self-center">Reiner Ablauftermin ohne Teilnahmen</div>
            <InputText value={indicators.pure_date} onChange={(e) => setIndicators({ ...indicators, pure_date: e.target.value })} />
          </div>
        </div>
      </Panel>
    </>
  )
}