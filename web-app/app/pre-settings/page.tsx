"use client";
import React, { useState, useContext, useEffect } from "react";
import { useI18nContext } from "@/i18n/i18n-react";
import { Panel } from "primereact/panel";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight, faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import Columnnames from "@/components/pre-settings/columnames";
import Indicators from "@/components/pre-settings/indicators";
import Link from "next/link";

export default function PreSettings() {
  const { LL } = useI18nContext();

  

  return (
    <>
      <div className="text-2xl font-bold">Voreinstellungen</div>
      <div className="text-md">
        Hier kannst du einige Voreinstellungen für die App vornehmen, sofern du etwas ändern möchtest.
      </div>
      <Columnnames />
      <Indicators />
      <div className="flex flex-col lg:flex-row gap-4 justify-around">
        <Link href="/">
          <Button label="Zurück" icon={<FontAwesomeIcon icon={faArrowLeft} className="mr-3" />} severity="warning" />
        </Link>
        <Link href="review">
        <Button
          label="Speichern und Weiter"
          icon={
            <FontAwesomeIcon icon={faFloppyDisk} className="mr-3" />
          }
          />
        </Link>
      </div>
    </>
  )
}